"use client";

import { useState } from "react";
import { acceptApplication, rejectApplication } from "@/actions/client.actions";
import { useRouter } from "next/navigation";

interface Props {
  applicationId: string;
  jobId: string;
  jobStatus: string;
}

export function ApplicationActions({ applicationId, jobId, jobStatus }: Props) {
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);
  const router = useRouter();

  if (jobStatus !== "OPEN") return null;

  async function handle(action: "accept" | "reject") {
    setLoading(action);
    try {
      if (action === "accept") {
        await acceptApplication(applicationId);
      } else {
        await rejectApplication(applicationId);
      }
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handle("accept")}
        disabled={loading !== null}
        className="text-sm bg-[#14a800] hover:bg-[#108a00] disabled:opacity-60 text-white px-4 py-2 rounded-lg transition-colors font-medium"
      >
        {loading === "accept" ? "..." : "✓ Принять"}
      </button>
      <button
        onClick={() => handle("reject")}
        disabled={loading !== null}
        className="text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-red-300 hover:text-red-500 disabled:opacity-60 px-4 py-2 rounded-lg transition-colors"
      >
        {loading === "reject" ? "..." : "Отклонить"}
      </button>
    </div>
  );
}
