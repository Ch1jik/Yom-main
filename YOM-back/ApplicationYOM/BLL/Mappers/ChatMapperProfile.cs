using AutoMapper;
using BLL.Models.Chat;

namespace BLL.Mappers
{
    public class ChatMapperProfile : Profile
    {
        public ChatMapperProfile()
        {
            CreateMap<Models.Chat.Conversation, DAL.Entities.Conversation>();
            CreateMap<Models.Chat.Conversation, DAL.Entities.Conversation>().ReverseMap();

            CreateMap<Models.Chat.SendChatMessage, Models.Chat.ChatMessage>();
            CreateMap<Models.Chat.SendChatMessage, DAL.Entities.ChatMessage>();
            CreateMap<Models.Chat.ChatMessage, DAL.Entities.ChatMessage>();
            CreateMap<Models.Chat.ChatMessage, DAL.Entities.ChatMessage>().ReverseMap();

            CreateMap<Models.Chat.UserConversation, DAL.Entities.UserConversation>();
            CreateMap<Models.Chat.UserConversation, DAL.Entities.UserConversation>().ReverseMap();

            CreateMap<Models.Chat.ChatMessage, DAL.Entities.ChatMessage>();
            CreateMap<Models.Chat.ChatMessage, DAL.Entities.ChatMessage>().ReverseMap();

            CreateMap<DAL.Entities.UserConversation, ChatConversation>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ConversationType, opt => opt.MapFrom(src => src.ConversationType))
                .ForMember(dest => dest.ConversationGuid, opt => opt.MapFrom(src => src.Conversation.ConversationGuid))
                .ForMember(dest => dest.IsBlocked, opt => opt.MapFrom(src => src.Conversation.IsBlocked))
                .ForMember(dest => dest.LastMessageSentAt,
                    opt => opt.MapFrom(src => src.Conversation.LastMessageSentAt))
                .ForMember(dest => dest.IsMuted, opt => opt.MapFrom(src => src.IsMuted))
                .ForMember(dest => dest.IsPinned, opt => opt.MapFrom(src => src.IsPinned))
                .ForMember(dest => dest.RecipientId, opt => opt.MapFrom(src => src.RecipientId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Recipient.FullName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Recipient.UserName))
                .ForMember(dest => dest.AvatarPath, opt => opt.MapFrom(src => src.Recipient.AvatarPath))
                    .ForMember(dest => dest.LastMessageText, opt => opt.MapFrom(src => src.LastMessageText));

        }
    }
}
