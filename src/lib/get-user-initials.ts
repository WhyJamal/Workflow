export function getUserInitials(user?: {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}) {
  if (!user) return "U";

  const initials =
    `${user.firstName?.charAt(0) ?? ""}${
      user.lastName?.charAt(0) ?? ""
    }`.toUpperCase();

  return initials || user.name?.charAt(0)?.toUpperCase() || "U";
}