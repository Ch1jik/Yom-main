using MimeKit;


namespace BLL.Models.Email
{
    public class Message
    {
        public List<MailboxAddress> ToMail { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public Message(IEnumerable<string> to, string subject, string content)
        {
            ToMail = new List<MailboxAddress>();
            ToMail.AddRange(to.Where(x => !string.IsNullOrEmpty(x)).Select(x => new MailboxAddress("YOMApplication", x)));
            //ToMail.AddRange(to.Select(x => new MailboxAddress("YOMApplication", x)));
            Subject = subject;
            Content = content;
        }
    }
}
