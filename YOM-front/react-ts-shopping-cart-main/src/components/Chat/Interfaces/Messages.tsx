interface Message {
  id: number;
  senderId: string;
  messageText: string;
  sentAt: string;
  messageStatus: string;
  avatarPath: string | null;
  userAvatar: string | null;
  username: string;
}

interface SendChatMessage {
  senderId: string;
  messageText: string;
  messageStatus: MessageStatus;
}

enum MessageStatus {
  Sent = "Sent",
  Delivered = "Delivered",
  Read = "Read"
}

interface Messages {
  messages: Message[];
  isBlocked: boolean;
  avatarPath: string | null;
  userAvatar: string | null;
  username: string;
}