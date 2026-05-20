export type TJobCard = {
  id: string;
  title: string;
  category: string;
  desc: string;
  budget: string;
  deadline: string;
  posted: string;
  proposals: number;

  client: {
    name: string;
    rating: number;
    jobs: number;
  };
};

export type TMyJobCard = {
  id: string;
  title: string;

  status: string;
  statusKey: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  statusColor: string;

  client: string;
  deadline: string;

  price: string;

  progress: number;
};

export type TSavedJobCard = {
  savedId: string;
  savedAt: string;

  id: string;
  title: string;
  category: string;
  budget: string;
  deadline: string;
  proposals: number;
  desc: string;

  client: {
    name: string;
    rating: number;
  };
};

export type TRecentJobCard = {
  id: string;

  title: string;
  client: string;

  time: string;
  price: string;

  status: string;
  statusColor: string;
};

export type TClientJobCard = {
  id: string;

  title: string;
  category: string;

  status: string;
  statusColor: string;

  createdAt: string;

  budget: string;
  deadline: string;

  applications: number;

  acceptedMaster?: string | null;
};

export type TJobApplicationCard = {
  id: string;
  status: string;
  coverLetter: string;
  proposedPrice: string | null;
  createdAt: string;

  master: {
    id: string;
    name: string;
    image: string | null;
    title: string;
    city: string;

    skills: string[];

    rating: number;
    reviewsCount: number;
    completedJobs: number;
  };
};

export type TClientDashboardJob = {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  budget: string;
  applications: number;
  master: string | null;
};