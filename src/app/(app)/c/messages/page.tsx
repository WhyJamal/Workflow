import { getConversations, getMessages } from "@/actions/message.actions";
import { MessagesClient } from "./messages-client";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { conv?: string };
}) {
  const conversations = await getConversations();
  const activeConvId = searchParams.conv ?? conversations[0]?.id;
  const messages = activeConvId ? await getMessages(activeConvId) : [];

  return (
    <MessagesClient
      conversations={conversations}
      initialMessages={messages}
      activeConvId={activeConvId ?? null}
    />
  );
}
