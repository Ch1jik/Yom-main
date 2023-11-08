namespace BLL.Models.Email
{
#nullable disable

    public class EmailSettings
    {
        public string SmtpServer { get; set; } = null;
        public int SmtpPort { get; set; }
        public string SenderName { get; set; } = null;
        public string SmtpUser { get; set; } = null;
        public string SmtpPassword { get; set; } = null;
        public bool EnableSsl { get; set; }
    }
}