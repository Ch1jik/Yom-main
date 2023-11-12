export interface Conversation {
    id: number;
    conversationGuid: string;
    isMuted: boolean;
    isPinned: boolean;
    conversationType: string;
    isBlocked: boolean;
    lastMessageSentAt: string;
    recipientId: string;
    fullName: string;
    userName: string;
    avatarPath: string;
    lastMessageText: string,
}

export interface ConversationBarItemProps {
    id: number;
    conversationGuid: string,
    isPinned: boolean,
    lastMessageSentAt: string,
    lastMessageText: string,
    recipientId: string,
    fullName: string,
    avatarPath: string
}

export interface ConversationRecipientBarItemProps {
    isTyping: boolean,
    isOnline: boolean;
    conversationGuid: string;
    recipientId: string;
    userName: string;
    avatarPath: string;
    isMuted: boolean;
    isPinned: boolean;
    isBlocked: boolean;
}

export interface DropdownMenuItemProps {
    conversationGuid: string;
    isMuted: boolean;
    isPinned: boolean;
    isBlocked: boolean;
}