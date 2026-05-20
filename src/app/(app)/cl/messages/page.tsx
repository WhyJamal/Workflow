import { getConversations, getMessages } from "@/actions/message.actions";
import { MessagesClient } from "@/app/(app)/c/messages/messages-client";

export default async function ClientMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ conv?: string }>;
}) {
  const conversations = await getConversations();
  const activeConvId = (await searchParams).conv ?? conversations[0]?.id;
  const messages = activeConvId ? await getMessages(activeConvId) : [];

  return (
    <MessagesClient
      conversations={conversations}
      initialMessages={messages}
      activeConvId={activeConvId ?? null}
    />
  );
}
