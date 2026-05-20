"use client";

import { useState } from "react";
import { applyToJob } from "@/actions/job.actions";

export function ApplyButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    setLoading(true);
    setError(null);
    try {
      await applyToJob(jobId, {});
      setApplied(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  if (applied) {
    return (
      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-4 py-1.5 rounded-full font-medium">
        Отклик отправлен ✓
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleApply}
        disabled={loading}
        className="bg-[#14a800] hover:bg-[#108a00] disabled:opacity-60 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
      >
        {loading ? "..." : "Откликнуться"}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
