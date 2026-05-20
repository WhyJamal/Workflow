"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type { TMasterProfileWithRelations } from "@/types/prisma.type";
import { PAGES } from "@/config/pages.config";
import { getWorks, type WorkWithDetails } from "@/actions/work.actions";

export type MasterProfilePageData = {
  id: string;
  name: string;
  image: string | null;
  role: string;
  bio: string;
  title: string;
  city: string;
  hourlyRate: number | null | undefined;
  minBudget: number | null | undefined;
  isVerified: boolean;
  skills: string[];
  portfolio: { id: string; title: string; category: string | null; description: string | null; imageUrl: string | null }[];
  reviews: { id: string; name: string; rating: number; text: string; date: string }[];
  works: WorkWithDetails[];
  stats: {
    completedJobs: number;
    avgRating: number;
    reviewsCount: number;
    yearsOnPlatform: string;
    worksCount: number;
  };
} | null;

export async function getMasterProfile(userId?: string): Promise<MasterProfilePageData> {
  const session = await auth();
  const targetId = userId ?? session?.user?.id;
  if (!targetId) return null;

  const user = await prisma.user.findUnique({
    where: { id: targetId },
    include: {
      masterProfile: {
        include: {
          skills: true,
          portfolio: { orderBy: { createdAt: "desc" } },
        },
      },
      reviewsReceived: {
        include: {
          author: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      _count: {
        select: {
          reviewsReceived: true,
        },
      },
    },
  });

  if (!user) return null;

  const [completedJobs, works] = await Promise.all([
    prisma.job.count({
      where: {
        applications: {
          some: { masterId: targetId, status: "ACCEPTED" },
        },
        status: "COMPLETED",
      },
    }),
    getWorks(targetId),
  ]);

  const avgRating =
    user.reviewsReceived.length > 0
      ? +(
          user.reviewsReceived.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) /
          user.reviewsReceived.length
        ).toFixed(1)
      : 0;

  const joinedYear = user.createdAt.getFullYear();
  const yearsOnPlatform = new Date().getFullYear() - joinedYear;

  return {
    id: user.id,
    name: user.name ?? "",
    image: user.image,
    role: user.role,
    bio: user.masterProfile?.bio ?? "",
    title: user.masterProfile?.title ?? "",
    city: user.masterProfile?.city ?? "Ташкент",
    hourlyRate: user.masterProfile?.hourlyRate,
    minBudget: user.masterProfile?.minBudget,
    isVerified: user.masterProfile?.isVerified ?? false,
    skills: user.masterProfile?.skills.map((s: { name: string }) => s.name) ?? [],
    portfolio: user.masterProfile?.portfolio ?? [],
    reviews: user.reviewsReceived.map((r: TMasterProfileWithRelations["reviewsReceived"][number]) => ({
      id: r.id,
      name: r.author.name ?? "Аноним",
      rating: r.rating,
      text: r.text ?? "",
      date: r.createdAt.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    })),
    works,
    stats: {
      completedJobs,
      avgRating,
      reviewsCount: user._count.reviewsReceived,
      yearsOnPlatform: yearsOnPlatform > 0 ? `${yearsOnPlatform} ${yearsOnPlatform === 1 ? "год" : "года"}` : "менее года",
      worksCount: works.length,
    },
  };
}

export async function updateProfile(data: {
  firstName?: string;
  lastName?: string;
  bio?: string;
  title?: string;
  city?: string;
  hourlyRate?: number;
  minBudget?: number;
  skills?: string[];
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const { firstName, lastName, bio, title, city, hourlyRate, minBudget, skills } = data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName,
      lastName,
      name: firstName && lastName ? `${firstName} ${lastName}`.trim() : undefined,
    },
  });

  const profile = await prisma.masterProfile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      bio,
      title,
      city,
      hourlyRate,
      minBudget,
    },
    update: {
      bio,
      title,
      city,
      hourlyRate,
      minBudget,
    },
  });

  if (skills !== undefined) {
    await prisma.masterSkill.deleteMany({ where: { profileId: profile.id } });
    if (skills.length > 0) {
      await prisma.masterSkill.createMany({
        data: skills.map((name) => ({ name, profileId: profile.id })),
      });
    }
  }

  revalidatePath(PAGES.PROFILE);
  return { success: true };
}

export async function addPortfolioItem(data: {
  title: string;
  category?: string;
  description?: string;
  imageUrl?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const profile = await prisma.masterProfile.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id },
    update: {},
  });

  await prisma.portfolioItem.create({
    data: { ...data, profileId: profile.id },
  });

  revalidatePath(PAGES.PROFILE);
  return { success: true };
}

export async function deletePortfolioItem(itemId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  await prisma.portfolioItem.deleteMany({
    where: {
      id: itemId,
      profile: { userId: session.user.id },
    },
  });

  revalidatePath(PAGES.PROFILE);
  return { success: true };
}

export async function leaveReview(data: {
  masterId: string;
  rating: number;
  text?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  if (data.masterId === session.user.id) throw new Error("Нельзя оставить отзыв себе");

  await prisma.review.create({
    data: {
      masterId: data.masterId,
      authorId: session.user.id,
      rating: data.rating,
      text: data.text,
    },
  });

  revalidatePath(PAGES.PROFILE);
  return { success: true };
}
