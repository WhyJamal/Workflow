"use client";

import { useState } from "react";
import { unsaveJob } from "@/actions/saved-job.actions";
import { useRouter } from "next/navigation";

export function UnsaveButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUnsave() {
    setLoading(true);
    try {
      await unsaveJob(jobId);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleUnsave}
      disabled={loading}
      className="text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "Удалить"}
    </button>
  );
}
