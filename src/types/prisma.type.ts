import {
    Prisma,
    User,
    Job,
    JobApplication,
    MasterProfile,
    MasterSkill,
    Review,
    SavedJob,
    WorkLike,
    WorkMedia,
    Work,
} from "@/generated/prisma/client";

export type TUser = User;
export type TJob = Job;
export type TJobApplication = JobApplication;
export type TMasterProfile = MasterProfile;
export type TMasterSkill = MasterSkill;
export type TReview = Review;
export type TSavedJob = SavedJob;
export type TWork = Work;
export type TWorkMedia = WorkMedia;
export type TWorkLike = WorkLike;

export type TJobWithRelations = Prisma.JobGetPayload<{
    include: {
        category: true;
        client: {
            include: {
                reviewsReceived: {
                    select: {
                        rating: true;
                    };
                };

                clientJobs: {
                    select: {
                        id: true;
                    };
                };
            };
        };
        applications: {
            include: {
                master: {
                    include: {
                        masterProfile: true;
                    };
                };
            };
        };
        _count: {
            select: {
                applications: true;
            };
        };
    };
}>;

export type TMasterWithRelations = Prisma.UserGetPayload<{
    include: {
        masterProfile: {
            include: {
                skills: true;
                portfolio: true;
            };
        };

        reviewsReceived: {
            select: {
                rating: true;
            };
        };

        _count: {
            select: {
                applications: true;
            };
        };
    };
}>;

export type TApplicationWithRelations =
    Prisma.JobApplicationGetPayload<{
        include: {
            master: {
                include: {
                    masterProfile: {
                        include: {
                            skills: true;
                        };
                    };

                    reviewsReceived: {
                        select: {
                            rating: true;
                        };
                    };

                    _count: {
                        select: {
                            applications: true;
                        };
                    };
                };
            };

            job: true;
        };
    }>;


export type TConversationWithRelations =
    Prisma.ConversationGetPayload<{
        include: {
            participants: {
                include: {
                    user: {
                        select: {
                            id: true;
                            name: true;
                            image: true;
                        };
                    };
                };
            };

            messages: true;

            job: {
                select: {
                    title: true;
                };
            };
        };
    }>;

export type TMessageWithSender =
    Prisma.MessageGetPayload<{
        include: {
            sender: {
                select: {
                    id: true;
                    name: true;
                };
            };
        };
    }>;

export type TMasterProfileWithRelations =
    Prisma.UserGetPayload<{
        include: {
            masterProfile: {
                include: {
                    skills: true;
                    portfolio: true;
                };
            };

            reviewsReceived: {
                include: {
                    author: {
                        select: {
                            name: true;
                        };
                    };
                };
            };

            _count: {
                select: {
                    reviewsReceived: true;
                };
            };
        };
    }>;

export type TSavedJobWithRelations =
    Prisma.SavedJobGetPayload<{
        include: {
            job: {
                include: {
                    category: {
                        select: {
                            name: true;
                        };
                    };

                    client: {
                        select: {
                            name: true;

                            reviewsReceived: {
                                select: {
                                    rating: true;
                                };
                            };
                        };
                    };

                    _count: {
                        select: {
                            applications: true;
                        };
                    };
                };
            };
        };
    }>;

export type TWorkWithRelations = Prisma.WorkGetPayload<{
    include: {
        author: {
            select: {
                id: true;
                name: true;
                image: true;
                masterProfile: {
                    select: {
                        title: true;
                    };
                };
            };
        };
        
        likes: {
            select: {
                userId: true,
            },
        },

        media: {
            orderBy: {
                order: "asc";
            };
        };
        _count: {
            select: {
                likes: true;
            };
        };
    };
}>;

export type TWorkFeedItem = TWorkWithRelations & {
    isLiked: boolean;
};
