using BLL.Models.Email;

namespace BLL.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}