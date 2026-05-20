"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type { 
  TApplicationWithRelations, 
  TJobWithRelations, 
  TMasterSkill, 
  TMasterWithRelations 
} from "@/types/prisma.type";
import { PAGES } from "@/config/pages.config";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getClientDashboard() {
  const session = await auth();
  if (!session?.user?.id)
    return { totalJobs: 0, activeJobs: 0, completedJobs: 0, newApplications: 0, recentJobs: [] };

  const userId = session.user.id;

  const [totalJobs, activeJobs, completedJobs, newApplications, recentJobs] =
    await Promise.all([
      prisma.job.count({ where: { clientId: userId } }),
      prisma.job.count({ where: { clientId: userId, status: "OPEN" } }),
      prisma.job.count({ where: { clientId: userId, status: "COMPLETED" } }),
      prisma.jobApplication.count({
        where: {
          job: { clientId: userId },
          status: "PENDING",
        },
      }),
      prisma.job.findMany({
        where: { clientId: userId },
        include: {
          _count: { select: { applications: true } },
          applications: {
            where: { status: "ACCEPTED" },
            include: { master: { select: { name: true } } },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
    ]);

  const statusLabel: Record<string, string> = {
    OPEN: "Открыт",
    IN_PROGRESS: "В работе",
    COMPLETED: "Завершён",
    CANCELLED: "Отменён",
  };

  const statusColor: Record<string, string> = {
    OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return {
    totalJobs,
    activeJobs,
    completedJobs,
    newApplications,
    recentJobs: recentJobs.map((j: TJobWithRelations) => ({
      id: j.id,
      title: j.title,
      status: statusLabel[j.status] ?? j.status,
      statusColor: statusColor[j.status] ?? "",
      budget: j.budget,
      applications: j._count.applications,
      master: j.applications[0]?.master?.name ?? null,
    })),
  };
}

// ─── My Jobs (Client's posted jobs) ─────────────────────────────────────────

export async function getClientJobs(statusFilter?: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const statusMap: Record<string, string> = {
    "Открытые": "OPEN",
    "В работе": "IN_PROGRESS",
    "Завершённые": "COMPLETED",
    "Отменённые": "CANCELLED",
  };

  const where: Record<string, unknown> = { clientId: session.user.id };
  if (statusFilter && statusFilter !== "Все" && statusMap[statusFilter]) {
    where.status = statusMap[statusFilter];
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      category: { select: { name: true } },
      _count: { select: { applications: true } },
      applications: {
        where: { status: "ACCEPTED" },
        include: { master: { select: { name: true } } },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const statusLabel: Record<string, string> = {
    OPEN: "Открыт",
    IN_PROGRESS: "В работе",
    COMPLETED: "Завершён",
    CANCELLED: "Отменён",
  };

  const statusColor: Record<string, string> = {
    OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return jobs.map((j: TJobWithRelations) => ({
    id: j.id,
    title: j.title,
    status: statusLabel[j.status] ?? j.status,
    statusKey: j.status,
    statusColor: statusColor[j.status] ?? "",
    budget: j.budget,
    deadline: j.deadline,
    category: j.category?.name ?? "Без категории",
    applications: j._count.applications,
    acceptedMaster: j.applications[0]?.master?.name ?? null,
    createdAt: j.createdAt.toLocaleDateString("ru-RU"),
  }));
}

// ─── Job Applications ─────────────────────────────────────────────────────────

export async function getJobApplications(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return { job: null, applications: [] };

  const job = await prisma.job.findFirst({
    where: { id: jobId, clientId: session.user.id },
    include: { category: { select: { name: true } } },
  });

  if (!job) return { job: null, applications: [] };

  const applications = await prisma.jobApplication.findMany({
    where: { jobId },
    include: {
      master: {
        include: {
          masterProfile: { include: { skills: true } },
          reviewsReceived: { select: { rating: true } },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    job: {
      id: job.id,
      title: job.title,
      budget: job.budget,
      deadline: job.deadline,
      status: job.status,
      category: job.category?.name ?? "Без категории",
    },
    applications: applications.map((a: TApplicationWithRelations) => ({
      id: a.id,
      status: a.status,
      coverLetter: a.coverLetter ?? "",
      proposedPrice: a.proposedPrice
        ? `${a.proposedPrice.toLocaleString()} сум`
        : null,
      createdAt: a.createdAt.toLocaleDateString("ru-RU"),
      master: {
        id: a.master.id,
        name: a.master.name ?? "Аноним",
        image: a.master.image,
        title: a.master.masterProfile?.title ?? "Мастер",
        city: a.master.masterProfile?.city ?? "Ташкент",
        skills: a.master.masterProfile?.skills.map((s: TMasterSkill) => s.name) ?? [],
        rating:
          a.master.reviewsReceived.length > 0
            ? +(
                a.master.reviewsReceived.reduce(
                  (acc: number, r: { rating: number }) => acc + r.rating,
                  0
                ) / a.master.reviewsReceived.length
              ).toFixed(1)
            : 0,
        reviewsCount: a.master.reviewsReceived.length,
        completedJobs: a.master._count.applications,
      },
    })),
  };
}

export async function acceptApplication(applicationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const application = await prisma.jobApplication.findFirst({
    where: { id: applicationId, job: { clientId: session.user.id } },
    include: { job: true },
  });
  if (!application) throw new Error("Заявка не найдена");

  await prisma.jobApplication.update({
    where: { id: applicationId },
    data: { status: "ACCEPTED" },
  });

  await prisma.job.update({
    where: { id: application.jobId },
    data: { status: "IN_PROGRESS" },
  });

  // Reject other pending applications
  await prisma.jobApplication.updateMany({
    where: {
      jobId: application.jobId,
      id: { not: applicationId },
      status: "PENDING",
    },
    data: { status: "REJECTED" },
  });

  revalidatePath(PAGES.JOB(application.jobId));
  revalidatePath(PAGES.CLIENT_MY_JOBS);
  return { success: true };
}

export async function rejectApplication(applicationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const application = await prisma.jobApplication.findFirst({
    where: { id: applicationId, job: { clientId: session.user.id } },
  });
  if (!application) throw new Error("Заявка не найдена");

  await prisma.jobApplication.update({
    where: { id: applicationId },
    data: { status: "REJECTED" },
  });

  revalidatePath(PAGES.JOB(application.jobId));
  return { success: true };
}

export async function completeJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  await prisma.job.updateMany({
    where: { id: jobId, clientId: session.user.id },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/cl/my-jobs");
  return { success: true };
}

// ─── Post Job ─────────────────────────────────────────────────────────────────

export async function postJob(data: {
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
    data: { ...data, clientId: session.user.id },
  });

  revalidatePath("/cl/my-jobs");
  return { success: true, jobId: job.id };
}

// ─── Find Masters ─────────────────────────────────────────────────────────────

export async function getMasters({
  search,
  category,
}: {
  search?: string;
  category?: string;
} = {}) {
  const masters: TMasterWithRelations[] = await prisma.user.findMany({
    where: {
      masterProfile: { isNot: null },
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { masterProfile: { title: { contains: search } } },
              { masterProfile: { bio: { contains: search } } },
              {
                masterProfile: {
                  skills: { some: { name: { contains: search } } },
                },
              },
            ],
          }
        : {}),
    },
    include: {
      masterProfile: { include: { skills: { take: 5 } } },
      reviewsReceived: { select: { rating: true } },
      _count: {
        select: { applications: true },
      },
    },
    take: 30,
  });

  return masters.map((m: TMasterWithRelations) => ({
    id: m.id,
    name: m.name ?? "Аноним",
    image: m.image,
    title: m.masterProfile?.title ?? "Мастер",
    city: m.masterProfile?.city ?? "Ташкент",
    hourlyRate: m.masterProfile?.hourlyRate,
    bio: m.masterProfile?.bio ?? "",
    skills: m.masterProfile?.skills.map((s) => s.name) ?? [],
    rating:
      m.reviewsReceived.length > 0
        ? +(
            m.reviewsReceived.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) /
            m.reviewsReceived.length
          ).toFixed(1)
        : 0,
    reviewsCount: m.reviewsReceived.length,
    isVerified: m.masterProfile?.isVerified ?? false,
  }));
}
