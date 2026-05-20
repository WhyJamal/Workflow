import { auth } from "@/auth";
import { getWorks } from "@/actions/work.actions";
import { WorksClient } from "./works-client";

export default async function WorksPage() {
  const session = await auth();
  const works = await getWorks();

  return (
    <WorksClient
      works={works}
      currentUserId={session?.user?.id ?? null}
      currentUserRole={(session?.user as any)?.role ?? null}
    />
  );
}