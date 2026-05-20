"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { sendMessage, getMessages } from "@/actions/message.actions";
import type { 
  Conversation, 
  Message
} from "@/features/messages/massage.type";
import { COLORS } from "@/features/messages/massage.config";

export function MessagesClient({
  conversations,
  initialMessages,
  activeConvId,
}: {
  conversations: Conversation[];
  initialMessages: Message[];
  activeConvId: string | null;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [activeConvId, initialMessages]);

  // Polling every 5 seconds for new messages
  const pollMessages = useCallback(async () => {
    if (!activeConvId) return;
    try {
      const fresh = await getMessages(activeConvId);
      setMessages((prev) => (fresh.length !== prev.length ? fresh : prev));
    } catch {
      // silently fail
    }
  }, [activeConvId]);

  useEffect(() => {
    if (!activeConvId) return;
    pollingRef.current = setInterval(pollMessages, 5000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [activeConvId, pollMessages]);

  async function handleSend() {
    if (!inputValue.trim() || !activeConvId || sending) return;
    const text = inputValue.trim();
    setInputValue("");
    setSending(true);
    try {
      const newMsg = await sendMessage(activeConvId, text);
      setMessages((prev) => [...prev, newMsg]);
    } catch {
      setInputValue(text);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function getColor(index: number) {
    return COLORS[index % COLORS.length];
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-65px)] bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Нет сообщений</h3>
          <p className="text-zinc-400 text-sm">Откликнитесь на заказ или напишите мастеру, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-65px)] bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <div className="w-80 shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="font-semibold dark:text-white text-zinc-900 mb-3">Сообщения</h2>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Поиск..." className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14a800]/40" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, idx) => (
            <button
              key={conv.id}
              onClick={() => router.push(`?conv=${conv.id}`)}
              className={`w-full flex items-start gap-3 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left border-b border-zinc-50 dark:border-zinc-800/50 ${activeConvId === conv.id ? "bg-zinc-50 dark:bg-zinc-800" : ""}`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full bg-linear-to-br ${getColor(idx)} flex items-center justify-center text-white text-xs font-bold`}>
                  {conv.avatar}
                </div>
                {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white text-zinc-900 truncate">{conv.name}</span>
                  <span className="text-xs text-zinc-400 shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-zinc-500 truncate mt-0.5">{conv.lastMessage}</p>
                {conv.jobTitle && <p className="text-xs text-zinc-400 mt-0.5 truncate">{conv.jobTitle}</p>}
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-[#14a800] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-linear-to-br ${getColor(conversations.indexOf(activeConv))} flex items-center justify-center text-white text-xs font-bold`}>
                {activeConv.avatar}
              </div>
              <div>
                <p className="font-semibold dark:text-white text-zinc-900 text-sm">{activeConv.name}</p>
                {activeConv.jobTitle && <p className="text-xs text-zinc-400">{activeConv.jobTitle}</p>}
              </div>
            </div>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Онлайн
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-zinc-400 text-sm">Начните диалог</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "me"
                      ? "bg-[#14a800] text-white rounded-br-sm"
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm"
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/70" : "text-zinc-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14a800]/40"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || sending}
                className="bg-[#14a800] hover:bg-[#108a00] disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-zinc-400">Выберите диалог</p>
        </div>
      )}
    </div>
  );
}
