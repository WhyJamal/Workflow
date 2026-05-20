"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type {
  TConversationWithRelations,
  TMessageWithSender,
} from "@/types/prisma.type";

export async function getConversations() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: { some: { userId: session.user.id } },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      job: { select: { title: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return conversations.map((conv: TConversationWithRelations) => {
    const otherParticipant = conv.participants.find(
      (p: TConversationWithRelations["participants"][number]) => p.userId !== session.user!.id
    );
    const lastMessage = conv.messages[0];
    const unreadCount = 0; // can be computed separately

    return {
      id: conv.id,
      name: otherParticipant?.user.name ?? "Пользователь",
      avatar: (otherParticipant?.user.name ?? "U")
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
      lastMessage: lastMessage?.text ?? "Нет сообщений",
      time: lastMessage ? formatTime(lastMessage.createdAt) : "",
      unread: unreadCount,
      jobTitle: conv.job?.title ?? "",
      online: false,
    };
  });
}

export async function getMessages(conversationId: string) {
  console.dir("Fetching messages...", { conversationId });
  const session = await auth();
  if (!session?.user?.id) return [];

  // Mark messages as read
  await prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: session.user.id },
      read: false,
    },
    data: { read: true },
  });

  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: {
      sender: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return messages.map((msg: TMessageWithSender) => ({
    id: msg.id,
    text: msg.text,
    from: msg.senderId === session.user!.id ? "me" : "other",
    time: formatTime(msg.createdAt),
    senderName: msg.sender.name ?? "",
  }));
}

export async function sendMessage(conversationId: string, text: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  if (!text.trim()) throw new Error("Сообщение не может быть пустым");

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: session.user.id,
      text: text.trim(),
    },
    include: {
      sender: { select: { id: true, name: true } },
    },
  });

  // Update conversation timestamp
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/c/messages");

  return {
    id: message.id,
    text: message.text,
    from: "me" as const,
    time: formatTime(message.createdAt),
    senderName: message.sender.name ?? "",
  };
}

export async function startConversation(otherUserId: string, jobId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  // Check if conversation already exists
  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: session.user.id } } },
        { participants: { some: { userId: otherUserId } } },
        jobId ? { jobId } : {},
      ],
    },
  });

  if (existing) return existing.id;

  const conversation = await prisma.conversation.create({
    data: {
      jobId,
      participants: {
        create: [
          { userId: session.user.id },
          { userId: otherUserId },
        ],
      },
    },
  });

  revalidatePath("/c/messages");
  return conversation.id;
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  if (days === 0) {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (days === 1) return "вчера";
  if (days < 7) return `${days} дней назад`;
  return date.toLocaleDateString("ru-RU");
}
