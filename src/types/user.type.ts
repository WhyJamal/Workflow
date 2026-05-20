export const USER_ROLES = ["CLIENT", "MASTER"] as const;

export type TUserRole = (typeof USER_ROLES)[number];