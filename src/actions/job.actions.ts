"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type { TJobWithRelations } from "@/types/prisma.type";
import { PAGES } from "@/config/pages.config";

export async function getJobs({
  search,
  category,
  sort,
}: {
  search?: string;
  category?: string;
  sort?: string;
} = {}) {
  const where: Record<string, unknown> = {
    status: "OPEN",
  };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (category && category !== "Все категории") {
    where.category = { name: category };
  }

  const orderBy: Record<string, unknown> =
    sort === "highest"
      ? { budgetMax: "desc" }
      : sort === "fewest"
      ? { applications: { _count: "asc" } }
      : { createdAt: "desc" };

  const jobs = await prisma.job.findMany({
    where,
    orderBy,
    include: {
      client: {
        select: {
          id: true,
          name: true,
          image: true,
          reviewsReceived: {
            select: { rating: true },
          },
          clientJobs: {
            select: { id: true },
          },
        },
      },
      category: { select: { name: true } },
      _count: { select: { applications: true } },
    },
  });

  return jobs.map((job: TJobWithRelations) => ({
    id: job.id,
    title: job.title,
    category: job.category?.name ?? "Без категории",
    desc: job.description,
    budget: job.budget,
    deadline: job.deadline,
    posted: formatDate(job.createdAt),
    proposals: job._count.applications,
    client: {
      name: job.client.name ?? "Аноним",
      rating:
        job.client.reviewsReceived.length > 0
          ? +(
              job.client.reviewsReceived.reduce(
                (acc: number, r: { rating: number }) => acc + r.rating,
                0
              ) / job.client.reviewsReceived.length
            ).toFixed(1)
          : 0,
      jobs: job.client.clientJobs.length,
    },
  }));
}

export async function getMyJobs(statusFilter?: string) {
  console.dir("Fetching my jobs with status filter:", statusFilter);
  const session = await auth();
  if (!session?.user?.id) return [];

  const statusMap: Record<string, string> = {
    "В работе": "IN_PROGRESS",
    Ожидают: "OPEN",
    Завершённые: "COMPLETED",
    Отменённые: "CANCELLED",
  };

  const where: Record<string, unknown> = {
    applications: {
      some: {
        masterId: session.user.id,
        status: "ACCEPTED",
      },
    },
  };

  if (statusFilter && statusFilter !== "Все" && statusMap[statusFilter]) {
    where.status = statusMap[statusFilter];
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      client: { select: { name: true } },
      applications: {
        where: { masterId: session.user.id },
        select: { proposedPrice: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const statusLabel: Record<string, string> = {
    OPEN: "Ожидает",
    IN_PROGRESS: "В работе",
    COMPLETED: "Завершён",
    CANCELLED: "Отменён",
  };

  const statusColor: Record<string, string> = {
    OPEN: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    IN_PROGRESS:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return jobs.map((job: TJobWithRelations) => ({
    id: job.id,
    title: job.title,
    client: job.client.name ?? "Аноним",
    status: statusLabel[job.status] ?? job.status,
    statusKey: job.status,
    price: job.applications[0]?.proposedPrice
      ? `${job.applications[0].proposedPrice.toLocaleString()} сум`
      : job.budget,
    deadline: job.deadline,
    progress:
      job.status === "COMPLETED"
        ? 100
        : job.status === "IN_PROGRESS"
        ? 50
        : 0,
    statusColor: statusColor[job.status] ?? "",
  }));
}

export async function applyToJob(
  jobId: string,
  data: { coverLetter?: string; proposedPrice?: number }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const existing = await prisma.jobApplication.findUnique({
    where: { jobId_masterId: { jobId, masterId: session.user.id } },
  });

  if (existing) throw new Error("Вы уже откликнулись на этот заказ");

  await prisma.jobApplication.create({
    data: {
      jobId,
      masterId: session.user.id,
      coverLetter: data.coverLetter,
      proposedPrice: data.proposedPrice,
    },
  });

  revalidatePath(PAGES.FIND_WORK);
  revalidatePath(PAGES.MY_JOBS);
  return { success: true };
}

export async function createJob(data: {
  title: string;
  description: string;
  budget: string;
  budgetMin?: number;
  budgetMax?: number;
  deadline: string;
  categoryId?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const job = await prisma.job.create({
    data: {
      ...data,
      clientId: session.user.id,
    },
  });

  revalidatePath(PAGES.FIND_WORK);
  return job;
}

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id)
    return { activeJobs: 0, newMessages: 0, profileViews: 0, completedJobs: 0, recentJobs: [] };

  const [activeJobs, completedJobs, newMessages, recentJobs] =
    await Promise.all([
      prisma.job.count({
        where: {
          applications: {
            some: { masterId: session.user.id, status: "ACCEPTED" },
          },
          status: "IN_PROGRESS",
        },
      }),
      prisma.job.count({
        where: {
          applications: {
            some: { masterId: session.user.id, status: "ACCEPTED" },
          },
          status: "COMPLETED",
        },
      }),
      prisma.message.count({
        where: {
          read: false,
          conversation: {
            participants: { some: { userId: session.user.id } },
          },
          senderId: { not: session.user.id },
        },
      }),
      prisma.job.findMany({
        where: {
          applications: {
            some: { masterId: session.user.id, status: "ACCEPTED" },
          },
        },
        include: {
          client: { select: { name: true } },
          applications: {
            where: { masterId: session.user.id },
            select: { proposedPrice: true },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 3,
      }),
    ]);

  const statusLabel: Record<string, string> = {
    OPEN: "Ожидает",
    IN_PROGRESS: "В работе",
    COMPLETED: "Завершён",
    CANCELLED: "Отменён",
  };

  const statusColor: Record<string, string> = {
    OPEN: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return {
    activeJobs,
    newMessages,
    profileViews: 0, // future feature
    completedJobs,
    recentJobs: recentJobs.map((job: TJobWithRelations) => ({
      id: job.id,
      title: job.title,
      client: job.client.name ?? "Аноним",
      status: statusLabel[job.status] ?? job.status,
      price: job.applications[0]?.proposedPrice
        ? `${job.applications[0].proposedPrice.toLocaleString()} сум`
        : job.budget,
      time: formatDate(job.updatedAt),
      statusColor: statusColor[job.status] ?? "",
    })),
  };
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} час${hours === 1 ? "" : "а"} назад`;
  if (days === 1) return "вчера";
  if (days < 7) return `${days} дней назад`;
  return date.toLocaleDateString("ru-RU");
}
