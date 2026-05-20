"use client";

import { useState } from "react";
import { saveJob } from "@/actions/saved-job.actions";

export function SaveJobButton({ jobId }: { jobId: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await saveJob(jobId);
      setSaved(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      title={saved ? "Сохранено" : "Сохранить"}
      className="text-zinc-400 hover:text-[#14a800] disabled:opacity-60 transition-colors p-1"
    >
      <svg
        className={`w-4 h-4 ${saved ? "fill-[#14a800] text-[#14a800]" : ""}`}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0115.186 0z"
        />
      </svg>
    </button>
  );
}
