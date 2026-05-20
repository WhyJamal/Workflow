"use client";

import { useState, useRef, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteWork,
  toggleWorkLike,
  type WorkWithDetails,
} from "@/actions/work.actions";
import { WorkUploadModal } from "@/features/works/work-upload-modal";
import { Plus, Trash } from "lucide-react";
import { FeedIcon } from "@/assets/icons/feed-icon";
import { HeartIcon } from "@/assets/icons/heart-icon";
import { GridIcon } from "@/assets/icons/grid-icon";
import { Button } from "@/components/ui/button";


function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      {direction === "left" ? <polyline points="15,18 9,12 15,6" /> : <polyline points="9,18 15,12 9,6" />}
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function VideoPlayIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  );
}

function Avatar({ name, image, size = 40 }: { name?: string | null; image?: string | null; size?: number }) {
  const initials = (name ?? "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (image) {
    return (
      <div className="rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-500/30" style={{ width: size, height: size }}>
        <img src={image} alt={name ?? ""} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

// ─── Media Carousel ──────────────────────────────────────────────────────────

function MediaCarousel({ media }: { media: WorkWithDetails["media"] }) {
  const [index, setIndex] = useState(0);
  if (media.length === 0) return null;

  const current = media[index];
  return (
    <div className="relative aspect-square bg-zinc-900 overflow-hidden">
      {current.type === "VIDEO" ? (
        <video
          src={current.url}
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={current.url} alt="" className="w-full h-full object-cover" />
      )}

      {/* Navigation */}
      {media.length > 1 && (
        <>
          {index > 0 && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronIcon direction="left" />
            </button>
          )}
          {index < media.length - 1 && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronIcon direction="right" />
            </button>
          )}
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all ${i === index ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Video badge */}
      {current.type === "VIDEO" && (
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded px-1.5 py-0.5 text-xs text-white font-medium">
          VIDEO
        </div>
      )}
    </div>
  );
}

// ─── Grid Thumbnail ──────────────────────────────────────────────────────────

function GridThumbnail({
  work,
  onClick,
  isOwn,
  onDelete,
}: {
  work: WorkWithDetails;
  onClick: () => void;
  isOwn: boolean;
  onDelete: () => void;
}) {
  const first = work.media[0];
  const [deleting, startDelete] = useTransition();

  return (
    <div className="relative group aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-sm cursor-pointer" onClick={onClick}>
      {first?.type === "VIDEO" ? (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
          <VideoPlayIcon />
        </div>
      ) : first ? (
        <img src={first.url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800" />
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-sm font-semibold">
        <span className="flex items-center gap-1">
          <HeartIcon filled /> {work._count.likes}
        </span>
        {work.media.length > 1 && (
          <span className="flex items-center gap-1 text-xs bg-black/50 px-2 py-1 rounded-full">
            1/{work.media.length}
          </span>
        )}
      </div>

      {/* Delete button for owner */}
      {isOwn && (
        <Button
        variant="destructive"
        size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={deleting}
          className="p-1 rounded-full"
        >
          <Trash className="w-4 h-4"/>
        </Button>
      )}
    </div>
  );
}

// ─── Work Card (Feed) ────────────────────────────────────────────────────────

function WorkCard({
  work,
  currentUserId,
  onDelete,
}: {
  work: WorkWithDetails;
  currentUserId: string | null;
  onDelete: (id: string) => void;
}) {
  const [liked, setLiked] = useState(work.isLiked);
  const [likes, setLikes] = useState(work._count.likes);
  const [pending, startTransition] = useTransition();
  const isOwn = currentUserId === work.author.id;

  function handleLike() {
    if (!currentUserId) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((l) => (wasLiked ? l - 1 : l + 1));
    startTransition(async () => {
      await toggleWorkLike(work.id);
    });
  }

  const timeAgo = (() => {
    const diff = Date.now() - new Date(work.createdAt).getTime();

    const h = Math.floor(diff / 3600000);
    const d = Math.floor(h / 24);

    if (d > 0) return `${d} дн. назад`;
    if (h > 0) return `${h} ч. назад`;

    return "Только что";
  })();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={work.author.name} image={work.author.image} size={38} />
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
              {work.author.name ?? "Foydalanuvchi"}
            </p>
            {work.author.masterProfile?.title && (
              <p className="text-xs text-zinc-400 mt-0.5">{work.author.masterProfile.title}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">{timeAgo}</span>
          {isOwn && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(work.id)}
              className="p-1 rounded-full"
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Location */}
      {work.location && (
        <div className="px-4 pb-2 flex items-center gap-1 text-xs text-zinc-400">
          <MapPinIcon />
          {work.location}
        </div>
      )}

      {/* Media */}
      <MediaCarousel media={work.media} />

      {/* Actions */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={handleLike}
          disabled={!currentUserId || pending}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked
            ? "text-red-500"
            : "text-zinc-500 dark:text-zinc-400 hover:text-red-400"
            }`}
        >
          <HeartIcon filled={liked} />
          <span>{likes} лайк</span>
        </button>
      </div>

      {/* Caption */}
      {work.caption && (
        <div className="px-4 pb-4 pt-1.5">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{work.caption}</p>
        </div>
      )}
    </div>
  );
}

function WorkDetailModal({
  work,
  onClose,
  currentUserId,
  onDelete,
}: {
  work: WorkWithDetails;
  onClose: () => void;
  currentUserId: string | null;
  onDelete: (id: string) => void;
}) {
  const [liked, setLiked] = useState(work.isLiked);
  const [likes, setLikes] = useState(work._count.likes);
  const [pending, startTransition] = useTransition();
  const isOwn = currentUserId === work.author.id;

  function handleLike() {
    if (!currentUserId) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((l) => (wasLiked ? l - 1 : l + 1));
    startTransition(async () => { await toggleWorkLike(work.id); });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col sm:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media side */}
        <div className="sm:w-1/2 shrink-0 bg-black">
          <MediaCarousel media={work.media} />
        </div>

        {/* Info side */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Avatar name={work.author.name} image={work.author.image} size={36} />
              <div>
                <p className="text-sm font-semibold">{work.author.name ?? "Foydalanuvchi"}</p>
                {work.author.masterProfile?.title && (
                  <p className="text-xs text-zinc-400">{work.author.masterProfile.title}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isOwn && (
                <Button
                  onClick={() => { onDelete(work.id); onClose(); }}
                  variant="destructive"
                  size="icon"
                  className="p-1 rounded-full"
                >
                  <Trash />
                </Button>
              )}
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 text-2xl leading-none">&times;</button>
            </div>
          </div>

          {/* Caption / location */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {work.location && (
              <p className="flex items-center gap-1 text-xs text-zinc-400">
                <MapPinIcon /> {work.location}
              </p>
            )}
            {work.caption && (
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{work.caption}</p>
            )}
          </div>

          {/* Like bar */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={!currentUserId || pending}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? "text-red-500" : "text-zinc-500 hover:text-red-400"
                }`}
            >
              <HeartIcon filled={liked} />
              {likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function WorksClient({
  works: initialWorks,
  currentUserId,
  currentUserRole,
}: {
  works: WorkWithDetails[];
  currentUserId: string | null;
  currentUserRole: string | null;
}) {
  const [works, setWorks] = useState(initialWorks);
  const [view, setView] = useState<"feed" | "grid">("feed");
  const [showUpload, setShowUpload] = useState(false);
  const [selected, setSelected] = useState<WorkWithDetails | null>(null);
  const [, startDelete] = useTransition();
  const router = useRouter();

  const isMaster = currentUserRole === "MASTER";

  function handleDelete(id: string) {
    setWorks((prev) => prev.filter((w) => w.id !== id));
    startDelete(async () => {
      await deleteWork(id);
    });
  }

  function handleSuccess() {
    router.refresh();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Empty state */}
      {works.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="text-5xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Работ пока нет
          </h3>

          <p className="text-sm text-zinc-400">
            {isMaster
              ? "Разместите свою первую работу!"
              : "Мастера пока не добавили работы"}
          </p>
          {isMaster && (
            <Button
              size="lg"
              onClick={() => setShowUpload(true)}
            >
              Опубликовать работу
            </Button>
          )}
        </div>
      )}

      {/* Feed view */}
      {view === "feed" && works.length > 0 && (
        <div className="space-y-5 grid grid-cols-2 gap-1">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} currentUserId={currentUserId} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && works.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          {works.map((w) => (
            <GridThumbnail
              key={w.id}
              work={w}
              onClick={() => setSelected(w)}
              isOwn={currentUserId === w.author.id}
              onDelete={() => handleDelete(w.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showUpload && (
        <WorkUploadModal onClose={() => setShowUpload(false)} onSuccess={handleSuccess} />
      )}
      {selected && (
        <WorkDetailModal
          work={selected}
          onClose={() => setSelected(null)}
          currentUserId={currentUserId}
          onDelete={handleDelete}
        />
      )}

      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/70 dark:bg-zinc-900/70 px-3 py-2 shadow-2xl backdrop-blur-xl">

          <div className="flex items-center gap-1 rounded-xl bg-black/5 dark:bg-white/5 p-1">
            <button
              onClick={() => setView("feed")}
              className={`rounded-lg p-2.5 transition-all duration-200 ${view === "feed"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <FeedIcon />
            </button>

            <button
              onClick={() => setView("grid")}
              className={`rounded-lg p-2.5 transition-all duration-200 ${view === "grid"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <GridIcon />
            </button>
          </div>

          {isMaster && (
            <Button
              onClick={() => setShowUpload(true)}
              className="rounded-xl shadow-md"
              size="lg"
            >
              <Plus className="mr-1 h-4 w-4" />
              Добавить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}