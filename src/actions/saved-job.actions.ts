"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type { TSavedJobWithRelations } from "@/types/prisma.type";
import { PAGES } from "@/config/pages.config";

export async function getSavedJobs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const saved = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        include: {
          category: { select: { name: true } },
          client: {
            select: {
              name: true,
              reviewsReceived: { select: { rating: true } },
            },
          },
          _count: { select: { applications: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return saved.map((s: TSavedJobWithRelations) => ({
    savedId: s.id,
    savedAt: formatDate(s.createdAt),
    id: s.job.id,
    title: s.job.title,
    category: s.job.category?.name ?? "Без категории",
    budget: s.job.budget,
    deadline: s.job.deadline,
    proposals: s.job._count.applications,
    desc: s.job.description,
    client: {
      name: s.job.client.name ?? "Аноним",
      rating:
        s.job.client.reviewsReceived.length > 0
          ? +(
              s.job.client.reviewsReceived.reduce(
                (acc: number, r: { rating: number }) => acc + r.rating,
                0
              ) / s.job.client.reviewsReceived.length
            ).toFixed(1)
          : 0,
    },
  }));
}

export async function saveJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  await prisma.savedJob.upsert({
    where: { jobId_userId: { jobId, userId: session.user.id } },
    create: { jobId, userId: session.user.id },
    update: {},
  });

  revalidatePath(PAGES.SAVED_JOBS);
  revalidatePath(PAGES.FIND_WORK);
  return { success: true };
}

export async function unsaveJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  await prisma.savedJob.deleteMany({
    where: { jobId, userId: session.user.id },
  });

  revalidatePath(PAGES.SAVED_JOBS);
  revalidatePath(PAGES.FIND_WORK);
  return { success: true };
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 24) return `${hours} час${hours === 1 ? "" : "а"} назад`;
  if (days === 1) return "вчера";
  if (days < 7) return `${days} дней назад`;
  return date.toLocaleDateString("ru-RU");
}
