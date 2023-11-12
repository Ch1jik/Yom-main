export interface MessageProps {
  id: number;
  senderId: string;
  messageText: string;
  sentAt: string;
  messageStatus: string;
  avatarPath: string | null;
  userAvatar: string | null;
  username: string;
}

export interface SendChatMessage {
  senderId: string;
  messageText: string;
  messageStatus: MessageStatus;
}

export enum MessageStatus {
  Sent = "Sent",
  Delivered = "Delivered",
  Read = "Read"
}

export interface Messages {
  messages: MessageProps [];
  isBlocked: boolean;
}