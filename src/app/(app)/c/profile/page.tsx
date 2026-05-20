import { getMasterProfile } from "@/actions/profile.actions";
import { auth } from "@/auth";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getMasterProfile(session?.user?.id);

  return <ProfileClient profile={profile} />;
}
