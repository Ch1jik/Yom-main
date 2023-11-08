namespace PL.Models.Chat
{
    public enum UserStatus
    {
        Online = 0,
        Offline = 1
    }
    public enum MessageStatus
    {
        Sent = 1,
        Delivered = 2,
        ReadOut = 3
    }

    public enum UserTypingStatus
    {
        Typing = 0,
        InChat = 1
    }
    public enum ConversationType
    {
        Sale = 0,
        Buying = 1
    }
}
