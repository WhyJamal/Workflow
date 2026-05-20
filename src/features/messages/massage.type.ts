export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  jobTitle: string;
  online: boolean;
};

export type Message = {
  id: string;
  text: string;
  from: "me" | "other";
  time: string;
  senderName: string;
};