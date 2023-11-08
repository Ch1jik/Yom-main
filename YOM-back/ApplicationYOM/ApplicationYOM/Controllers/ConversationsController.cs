using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Chat;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Chat;
using ChatConversation = PL.Models.Chat.ChatConversation;
using Conversation = PL.Models.Chat.Conversation;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationsController : Controller
    {
        private readonly IConversationService _conversationService;
        private readonly IMapper _mapper;

        public ConversationsController(IConversationService conversationService, IMapper mapper)
        {
            _mapper = mapper;
            _conversationService = conversationService;
        }

        [HttpGet("All/Conversations")]
        public async Task<IEnumerable<ChatConversation>> GetAllConversationsByUserId(string userId, int? pageNumber, int? pageSize)
        {
            var unmappedConversations = await _conversationService.GetUserConversationsAsync(userId, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<ChatConversation>>(unmappedConversations);
        }

        [HttpGet("Conversation")]
        public async Task<ChatConversation> GetConversationsByUserId(string userId, string conversationGuid)
        {
            var unmappedConversations = await _conversationService.GetUserConversationAsync(userId, conversationGuid);
            return _mapper.Map<ChatConversation>(unmappedConversations);
        }

        [HttpPost("CreateConversation")]
        public async Task<Conversation> CreateConversation(CreateConversation model)
        {
            try
            {
                var mappedConversationType = _mapper.Map<BLL.Models.Enums.ConversationType>(model.ConversationType);
                var conversation = await _conversationService.CreateConversationAsync(model.SenderId, model.RecipientId, mappedConversationType);
                return _mapper.Map<Conversation>(conversation);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        [HttpPost("Pin")]
        public async Task<IActionResult> PinConversation(PinConversationModel model)
        {
            try
            {
                var mappedPin = _mapper.Map<PinConversation>(model);
                await _conversationService.ChangePinConversation(mappedPin);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Mute")]
        public async Task<IActionResult> MuteConversation(MuteConversationModel model)
        {
            try
            {
                var mappedMute = _mapper.Map<MuteConversation>(model);
                await _conversationService.ChangeMuteConversation(mappedMute);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Block")]
        public async Task<IActionResult> BlockConversation(BlockConversationModel model)
        {
            try
            {
                var mappedBlock = _mapper.Map<BlockConversation>(model);
                await _conversationService.BlockConversation(mappedBlock);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // Delete only messages
        [HttpPost("DeleteConversations")]
        public async Task<IActionResult> DeleteConversation(Guid conversationGuid)
        {
            try
            {
                await _conversationService.DeleteConversation(conversationGuid);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
