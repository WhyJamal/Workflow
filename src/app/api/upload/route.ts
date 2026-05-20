import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Требуется авторизация" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Можно загружать только изображения (JPEG, PNG, WebP, GIF) или видео (MP4, WebM, MOV)",
        },
        { status: 400 }
      );
    }

    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: isImage
            ? "Размер изображения не должен превышать 10MB"
            : "Размер видео не должен превышать 100MB",
        },
        { status: 400 }
      );
    }

    // Save to /public/uploads/works/
    const uploadDir = path.join(process.cwd(), "public", "uploads", "works");
    await mkdir(uploadDir, { recursive: true });

    const ext = file.name.split(".").pop() ?? (isImage ? "jpg" : "mp4");
    const fileName = `${session.user.id}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const url = `/uploads/works/${fileName}`;
    const mediaType: "IMAGE" | "VIDEO" = isImage ? "IMAGE" : "VIDEO";

    return NextResponse.json({ url, type: mediaType });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Произошла ошибка при загрузке" },
      { status: 500 }
    );
  }
}