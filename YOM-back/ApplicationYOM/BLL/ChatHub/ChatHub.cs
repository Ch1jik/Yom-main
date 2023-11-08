using System.Diagnostics;
using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Chat;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using Microsoft.AspNetCore.SignalR;

namespace BLL.ChatHub
{
    public class ChatHub : Hub
    {
        private readonly IConversationService _conversationService;
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;
        private  Dictionary<string, bool> userStatus = new();
        public ChatHub(IConversationService conversationService, IMessageService message, IMapper mapper)
        {
            _conversationService = conversationService;
            _messageService = message;
            _mapper = mapper;
        }

        public async Task SendMessageAsync(string? recipientId, SendChatMessage message)
        {
            try
            {
                var conversation = await GetConversationAsync(new Guid(message.ConversationGuid), message.SenderId,
                    recipientId, ConversationType.Buying);
                if (!conversation.IsBlocked)
                {
                    var mappedMessage = _mapper.Map<ChatMessage>(message);
                    mappedMessage.ConversationId = conversation.Id;
                    mappedMessage.SentAt = DateTime.Now;
                    mappedMessage.MessageStatus = MessageStatus.Delivered;
                    await _messageService.AddMessageAsync(mappedMessage, conversation.Id);
                    var messageToReceive = await _messageService.GetMessage(mappedMessage);
                    await Clients.Group(message.ConversationGuid).SendAsync("ReceiveMessage", messageToReceive);
                }
                else
                    await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", "Chat blocked");
            }
            catch (Exception ex)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", "Error: " + ex.Message);
            }
        }

        public async Task StartTyping(string conversationGuid, string userId)
        {
            await Clients.OthersInGroup(conversationGuid).SendAsync("UserTyping", userId);
        }

        public async Task StopTyping(string conversationGuid, string userId)
        {
            await Clients.OthersInGroup(conversationGuid).SendAsync("UserStoppedTyping", userId);
        }

        public async Task SetUserOnline(string userId)
        {
            // store at DB data
            userStatus[userId] = true;
            await Clients.All.SendAsync("UserOnline", userId);
        }

        public async Task SetUserOffline(string userId)
        {
            // store at DB data
            userStatus[userId] = false;
            await Clients.All.SendAsync("UserOffline", userId);
        }

        public bool GetUserStatus(string userId)
        {
            if (userStatus.ContainsKey(userId))
            {
                return userStatus[userId];
            }
            return false; // User is offline by default if status is not found.
        }
        public async Task RegisterClient(string userId)
        {
            var conversations = await _conversationService.GetUserConversationsAsync(userId, null, null);
            foreach (var conversation in conversations)
            {
                if (conversation.LastMessageText is null) continue;
                if (!conversation.IsBlocked)
                    await Groups.AddToGroupAsync(Context.ConnectionId, conversation.ConversationGuid.ToString());
            }
        }

        private async Task<Conversation> GetConversationAsync(Guid? conversationGuid, string? senderId,
            string? recipientId, ConversationType conversationType)
        {

            if (conversationGuid != null)
            {
                return await _conversationService.GetConversationAsync((Guid)conversationGuid);
            }

            return await _conversationService.GetConversationByIdsAsync(senderId, recipientId) ??
                   await _conversationService.CreateConversationAsync(senderId, recipientId, conversationType);
        }

        
    }
}
