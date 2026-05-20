"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startConversation } from "@/actions/message.actions";

interface Props {
  otherUserId: string;
  jobId?: string;
  redirectBase?: string; // "/c/messages" or "/cl/messages"
  className?: string;
  label?: string;
}

export function StartChatButton({
  otherUserId,
  jobId,
  redirectBase = "/c/messages",
  className = "text-sm bg-[#14a800] hover:bg-[#108a00] text-white px-4 py-2 rounded-lg transition-colors font-medium",
  label = "💬 Написать",
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handle() {
    setLoading(true);
    try {
      const convId = await startConversation(otherUserId, jobId);
      router.push(`${redirectBase}?conv=${convId}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handle} disabled={loading} className={className}>
      {loading ? "..." : label}
    </button>
  );
}
