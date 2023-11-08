using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Chat;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public MessagesController(IMessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ChatMessageModel>> GetMessagesByConversationGuid(Guid conversationGuid, int pageNumber)
        {
            var messages = await _messageService.GetAllConversationMessages(conversationGuid, pageNumber);
            return _mapper.Map<IEnumerable<ChatMessageModel>>(messages);
        }
    }
}
