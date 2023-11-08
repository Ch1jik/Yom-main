using BLL.Interfaces;
using BLL.Models.Email;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Diagnostics;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace BLL.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(EmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }
        public async Task SendEmailAsync(Message message)
        {
            var mailMessage = CreateEmailMessage(message);
            await SendAsync(mailMessage);
        }

        public MimeMessage CreateEmailMessage(Message message)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress("YOMApplication", _emailSettings.SenderName));
            mimeMessage.To.AddRange(message.ToMail);
            mimeMessage.Subject = message.Subject;
            mimeMessage.Body = new TextPart(TextFormat.Html) { Text = message.Content };
            return mimeMessage;
        }

        private async Task SendAsync(MimeMessage mimeMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    var socketOptions = _emailSettings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None;
                    await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.SmtpPort, socketOptions);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailSettings.SmtpUser, _emailSettings.SmtpPassword);
                    await client.SendAsync(mimeMessage);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }

        private void Send(MimeMessage mimeMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    var socketOptions = _emailSettings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None;
                    client.Connect(_emailSettings.SmtpServer, _emailSettings.SmtpPort, socketOptions);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailSettings.SmtpUser, _emailSettings.SmtpPassword);
                    client.Send(mimeMessage);
                }
                catch (SmtpException ex)
                {
                    Debug.WriteLine($"SmtpException ex: {ex}");
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}