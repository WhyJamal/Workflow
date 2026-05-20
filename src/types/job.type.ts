export enum JobStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
};

export type TJob = {
  id: string;
  title: string;
  description: string;
  budget: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  deadline: string;

  status: JobStatus;

  createdAt: string | Date;
  updatedAt: string | Date;

  clientId: string;
  categoryId?: string | null;
};