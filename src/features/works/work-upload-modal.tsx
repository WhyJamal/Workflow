import { useCallback, useRef, useState } from "react";
import { createWork } from "@/actions/work.actions";
import { MapPinIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type MediaPreview = {
    file: File;
    previewUrl: string;
    type: "IMAGE" | "VIDEO";
    uploadedUrl?: string;
};

export function WorkUploadModal({
    onClose,
    onSuccess,
}: {
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [previews, setPreviews] = useState<MediaPreview[]>([]);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [uploading, setUploading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback((files: FileList | null) => {
        if (!files) return;

        const newPreviews: MediaPreview[] = Array.from(files).map((file) => {
            const isVideo = file.type.startsWith("video/");

            return {
                file,
                previewUrl: URL.createObjectURL(file),
                type: isVideo ? "VIDEO" : "IMAGE",
            };
        });

        setPreviews((prev) => [...prev, ...newPreviews].slice(0, 10));
    }, []);

    function removePreview(i: number) {
        setPreviews((prev) => prev.filter((_, idx) => idx !== i));
    }

    async function handleSubmit() {
        if (previews.length === 0) {
            setError("Выберите хотя бы одно фото или видео");
            return;
        }

        setError(null);
        setUploading(true);

        try {
            const uploaded = await Promise.all(
                previews.map(async (p, i) => {
                    const fd = new FormData();
                    fd.append("file", p.file);

                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: fd,
                    });

                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.error ?? "Ошибка при загрузке");
                    }

                    const data = await res.json();

                    return {
                        url: data.url,
                        type: data.type as "IMAGE" | "VIDEO",
                        order: i,
                    };
                })
            );

            setPosting(true);

            await createWork({
                caption: caption.trim() || undefined,
                location: location.trim() || undefined,
                media: uploaded,
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err?.message ?? "Произошла ошибка");
        } finally {
            setUploading(false);
            setPosting(false);
        }
    }

    const isLoading = uploading || posting;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                        Новая работа
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {/* Drop zone */}
                    <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFiles(e.dataTransfer.files);
                        }}
                        className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                    >
                        <div className="text-4xl mb-2">📸</div>

                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Выберите фото или видео
                        </p>

                        <p className="text-xs text-zinc-400 mt-1">
                            JPEG, PNG, WebP, GIF, MP4, WebM, MOV · Максимум 10 файлов
                        </p>
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />

                    {/* Previews */}
                    {previews.length > 0 && (
                        <div className="grid grid-cols-5 gap-2">
                            {previews.map((p, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800"
                                >
                                    {p.type === "VIDEO" ? (
                                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                            <span className="text-white text-xl">▶</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={p.previewUrl}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <button
                                        onClick={() => removePreview(i)}
                                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-red-500 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {previews.length < 10 && (
                                <button
                                    onClick={() => fileRef.current?.click()}
                                    className="aspect-square rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                                >
                                    <PlusIcon />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Caption */}
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Описание... (необязательно)"
                        rows={3}
                        className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />

                    {/* Location */}
                    <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800">
                        <MapPinIcon />

                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Местоположение (необязательно)"
                            className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || previews.length === 0}
                        size="lg"
                        className="w-full"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                                    />
                                </svg>

                                {uploading
                                    ? "Загрузка..."
                                    : "Публикация..."}
                            </>
                        ) : (
                            "Опубликовать"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}