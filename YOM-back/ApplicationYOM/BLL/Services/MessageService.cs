using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Chat;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using DAL.Interfaces;

namespace BLL.Services
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MessageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AddMessageAsync(ChatMessage message, ulong id)
        {
            try
            {
                var mappedMessage = _mapper.Map<DAL.Entities.ChatMessage>(message);
                var userConversation =
                    await _unitOfWork.UserConversationRepository.GetByParamAsync(u =>
                        u.ConversationId == id);
                userConversation.LastMessageText = mappedMessage.MessageText;
                userConversation.Conversation.LastMessageSentAt = message.SentAt;
                _unitOfWork.UserConversationRepository.Update(userConversation);
                _unitOfWork.ChatMessageRepository.Add(mappedMessage);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<ChatMessage>> GetAllConversationMessages(Guid conversationGuid, int pageNumber)
        {
            var filterState = FilterExtension.CreateSingleFilter("ConversationGuid", GridFilterOperator.eq, conversationGuid.ToString(), // filter
                GridSortDirection.asc, "SentAt", pageNumber); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var messages = await _unitOfWork.ChatMessageRepository.GetAllByQueryAsync(mappedFilterState);
            return _mapper.Map<IEnumerable<ChatMessage>>(messages);
        }

        public async Task DeleteMessage(ulong messageId)
        {
            try
            {
                await _unitOfWork.ChatMessageRepository.DeleteById(messageId);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        public async Task<ChatMessage> GetMessage(ChatMessage message)
        {
            var msg = await _unitOfWork.ChatMessageRepository.GetByParamAsync(u =>
                u.ConversationGuid == message.ConversationGuid && u.MessageText == message.MessageText && u.SentAt ==
                    message.SentAt);
            if (msg == null)
                throw new YOMException("Message not exist in database");
            return _mapper.Map<ChatMessage>(msg);
        }
    }
}
