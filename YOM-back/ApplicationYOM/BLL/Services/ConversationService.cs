using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models.Chat;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using DAL.Entities;
using DAL.Interfaces;
using Conversation = BLL.Models.Chat.Conversation;
using ConversationType = BLL.Models.Enums.ConversationType;

namespace BLL.Services
{
    public class ConversationService : IConversationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public ConversationService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<Conversation> CreateConversationAsync(string senderId, string recipientId, ConversationType conversationType)
        {
            try
            {
                var firstUser = await GetUser(senderId);
                var secondUser = await GetUser(recipientId);
                var conversationGuid = await GenerateUniqueGuid();

                var possibleConversation = await _unitOfWork.ConversationRepository.GetByParamAsync(c => c.UserConversations.Any(u => u.UserId == firstUser.Id) && c.UserConversations.Any(u => u.UserId == secondUser.Id));
                if (possibleConversation is not null)
                    return _mapper.Map<Conversation>(possibleConversation);

                var conversation = new DAL.Entities.Conversation
                {
                    ConversationGuid = conversationGuid,
                    IsBlocked = false
                };

                _unitOfWork.ConversationRepository.Add(conversation);
                await _unitOfWork.SaveAsync();

                var conversationId = (await _unitOfWork.ConversationRepository.GetByParamAsync(u =>
                                        u.ConversationGuid == conversationGuid)).Id;
                AddUserToConversation(senderId, ConversationType.Buying, conversationId, recipientId);

                AddUserToConversation(recipientId, ConversationType.Sale, conversationId, senderId);
                await _unitOfWork.SaveAsync();

                return _mapper.Map<Conversation>(conversation);
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        

        public async Task<Conversation> GetConversationAsync(Guid conversationGuid)
        {
            var conversation = await _unitOfWork.ConversationRepository.GetByParamAsync(cnv => cnv.ConversationGuid == conversationGuid);
            return _mapper.Map<Conversation>(conversation);
        }

        public async Task<Conversation?> GetConversationByIdsAsync(string? senderId, string? recipientId)
        {
            var conversation = await _unitOfWork.ConversationRepository.GetByParamAsync(c =>
                c.UserConversations.Count == 2 &&
                c.UserConversations.Any(u => u.UserId == senderId) &&
                c.UserConversations.Any(u => u.UserId == recipientId));
            return _mapper.Map<Conversation>(conversation);
        }

        public async Task<ChatConversation> GetUserConversationAsync(string userId, string conversationGuid)
        {
            var conversation = await _unitOfWork.UserConversationRepository.GetByParamAsync(
                c => c.UserId == userId &&
                               c.Conversation.ConversationGuid == new Guid(conversationGuid));
            var mappedConversation = _mapper.Map<ChatConversation>(conversation);
            if (mappedConversation.AvatarPath is not null)
                mappedConversation.AvatarPath = await _photoService.GetUrlPhotoPath(mappedConversation.AvatarPath);
            return mappedConversation;
        }

        public async Task<IEnumerable<ChatConversation>> GetUserConversationsAsync(string userId, int? pageNumber, int? pageSize)
        {
            var filterState = FilterExtension.CreateSingleFilter("UserId", GridFilterOperator.eq, userId, // filter
                GridSortDirection.asc, "IsPinned", pageNumber, pageSize); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);

            try
            {
                var userConversations =
                    await _unitOfWork.UserConversationRepository.GetAllByQueryAsync(mappedFilterState);

                var mappedConversations = _mapper.Map<IEnumerable<ChatConversation>>(userConversations);
                mappedConversations.Where(u => u.RecipientId != userId);
                foreach (var conversation in mappedConversations)
                {
                    if (conversation.AvatarPath is not null)
                        conversation.AvatarPath = await _photoService.GetUrlPhotoPath(conversation.AvatarPath);
                }

                return mappedConversations;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Conversation>> GetBlockedConversationAsync(string userId)
        {
            var filterState = FilterExtension.CreateSingleFilter("UserId", GridFilterOperator.eq, userId, // filter
                null, null, null, null); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var conversations = await _unitOfWork.ConversationRepository.GetAllByQueryAsync(mappedFilterState);
            return _mapper.Map<IEnumerable<Conversation>>(conversations);
        }

        public async Task ChangePinConversation(PinConversation model)
        {
            try
            {
                var userConversation = await _unitOfWork.UserConversationRepository.GetByParamAsync(u =>
                    u.Conversation.ConversationGuid == model.ConversationGuid && u.UserId == model.UserId) 
                                       ?? throw new MessengerException("Conversation not exist");

                userConversation.IsPinned = model.IsPinned;
                _unitOfWork.UserConversationRepository.Update(userConversation);

                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        public async Task DeleteConversation(Guid conversationGuid)
        {
            try
            {
                var conversationToDelete = await _unitOfWork.ConversationRepository.GetByParamAsync(
                                               c => c.ConversationGuid == conversationGuid) 
                                           ?? throw new YOMException("Conversation with this Guid not exist");
                _unitOfWork.ChatMessageRepository.DeleteAllMessagesFromConversation(conversationToDelete.ConversationGuid);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        public async Task BlockConversation(BlockConversation model)
        {
            try
            {
                var userConversation = await _unitOfWork.UserConversationRepository.GetByParamAsync(u =>
                                           u.Conversation.ConversationGuid == model.ConversationGuid && u.UserId == model.UserId)
                                       ?? throw new MessengerException("Conversation not exist");

                userConversation.IsBlocked = model.IsBlocked;
                userConversation.Conversation.IsBlocked = model.IsBlocked;
                _unitOfWork.UserConversationRepository.Update(userConversation);

                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        public async Task ChangeMuteConversation(MuteConversation model)
        {
            try
            {
                var userConversation = await _unitOfWork.UserConversationRepository.GetByParamAsync(u =>
                                           u.Conversation.ConversationGuid == model.ConversationGuid && u.UserId == model.UserId)
                                       ?? throw new MessengerException("Conversation not exist");
                if(userConversation.IsMuted == model.IsMuted) 
                    throw new MessengerException("Conversation already muted");
                userConversation.IsMuted = model.IsMuted;
                _unitOfWork.UserConversationRepository.Update(userConversation);

                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new MessengerException(ex.Message);
            }
        }

        private void AddUserToConversation(string userId, ConversationType conversationType, ulong conversationId, string recipientId)
        {
            _unitOfWork.UserConversationRepository.Add(new DAL.Entities.UserConversation
            {
                UserId = userId,
                ConversationId = conversationId,
                IsPinned = false,
                ConversationType = _mapper.Map<DAL.Entities.ConversationType>(conversationType),
                RecipientId = recipientId
            });
        }

        private async Task<ApplicationUser> GetUser(string id)
        {
            var user = await _unitOfWork.UserRepository.GetByParamAsync(u => u.Id == id);
            return user ?? throw new YOMException($"User with Id: {id} not exist");
        } 
        
        private async Task<Guid> GenerateUniqueGuid()
        {
            while (true)
            {
                var possibleGuid = Guid.NewGuid();
                var conversationConnection = await _unitOfWork.ConversationRepository
                    .GetByParamAsync(cnv => cnv.ConversationGuid == possibleGuid);
                if (conversationConnection is null)
                    return possibleGuid;
            }
        }
    }
}
