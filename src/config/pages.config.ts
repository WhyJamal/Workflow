export const PAGES = {
    HOME: "/",
    APP: "/c",

    FIND_WORK: "/c/find-work",
    FIND_WORK_BY_CATEGORY: "/c/find-work/category",
    FIND_WORK_BY_CATEGORY_ID: "/c/find-work/category/[id]",

    SAVED_JOBS: "/c/saved-jobs",

    MY_JOBS: "/c/my-jobs",

    MESSAGES: "/c/messages",

    PROFILE: "/c/profile",

    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",

    // Client portal
    CLIENT_APP: "/cl",
    CLIENT_POST_JOB: "/cl/post-job",
    CLIENT_MY_JOBS: "/cl/my-jobs",
    CLIENT_FIND_MASTERS: "/cl/find-masters",
    CLIENT_MESSAGES: "/cl/messages",

    JOB: (JobId: string) => `${PAGES.CLIENT_MY_JOBS}/${JobId}`,

    HOW_IT_WORKS: "/#how-it-works",
    CATEGORIES: "/#categories",
    FOR_MASTERS: "/#for-masters",
    ABOUT: "/#about",
}