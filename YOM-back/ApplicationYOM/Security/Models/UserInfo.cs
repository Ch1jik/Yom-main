namespace Security.Models
{
    public class UserInfo
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public object Data { get; set; }
    }
}