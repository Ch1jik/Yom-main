using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.Chat
{
    public class PinConversation
    {
        public bool IsPinned { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
