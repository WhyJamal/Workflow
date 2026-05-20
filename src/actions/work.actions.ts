"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { PAGES } from "@/config/pages.config";
import { TWorkWithRelations } from "@/types/prisma.type";

export type WorkMediaType = "IMAGE" | "VIDEO";

export type WorkWithDetails = {
  id: string;
  caption: string | null;
  location: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
    masterProfile: { title: string | null } | null;
  };
  media: {
    id: string;
    url: string;
    type: WorkMediaType;
    order: number;
  }[];
  _count: { likes: number };
  isLiked: boolean;
};

export async function getWorks(userId?: string): Promise<WorkWithDetails[]> {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const works = await prisma.work.findMany({
    where: userId ? { authorId: userId } : undefined,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          masterProfile: { select: { title: true } },
        },
      },
      media: { orderBy: { order: "asc" } },
      _count: { select: { likes: true } },
      likes: currentUserId
        ? { where: { userId: currentUserId }, select: { id: true } }
        : false,
    },
    orderBy: { createdAt: "desc" },
  });

  return works.map((w: TWorkWithRelations) => ({
    id: w.id,
    caption: w.caption,
    location: w.location,
    createdAt: w.createdAt,
    author: w.author,
    media: w.media.map((m: TWorkWithRelations["media"][number]) => ({
      id: m.id,
      url: m.url,
      type: m.type as WorkMediaType,
      order: m.order,
    })),
    _count: w._count,
    isLiked: Array.isArray(w.likes) ? w.likes.length > 0 : false,
  }));
}

export async function createWork(data: {
  caption?: string;
  location?: string;
  media: { url: string; type: WorkMediaType; order: number }[];
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Avtorizatsiyadan o'ting");

  if (!data.media || data.media.length === 0) {
    throw new Error("Kamida bitta media fayl kerak");
  }

  const work = await prisma.work.create({
    data: {
      caption: data.caption,
      location: data.location,
      authorId: session.user.id,
      media: {
        create: data.media.map((m) => ({
          url: m.url,
          type: m.type,
          order: m.order,
        })),
      },
    },
  });

  revalidatePath(PAGES.WORKS);
  revalidatePath(PAGES.PROFILE);
  return { success: true, id: work.id };
}

export async function deleteWork(workId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Avtorizatsiyadan o'ting");

  await prisma.work.deleteMany({
    where: {
      id: workId,
      authorId: session.user.id,
    },
  });

  revalidatePath(PAGES.WORKS);
  revalidatePath(PAGES.PROFILE);
  return { success: true };
}

export async function toggleWorkLike(workId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Avtorizatsiyadan o'ting");

  const existing = await prisma.workLike.findUnique({
    where: { workId_userId: { workId, userId: session.user.id } },
  });

  if (existing) {
    await prisma.workLike.delete({
      where: { workId_userId: { workId, userId: session.user.id } },
    });
    revalidatePath(PAGES.WORKS);
    return { liked: false };
  }

  await prisma.workLike.create({
    data: { workId, userId: session.user.id },
  });
  revalidatePath(PAGES.WORKS);
  return { liked: true };
}
