namespace BLL.Models
{
    public class User
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? AvatarPath { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public UserRole UserRole { get; set; }
        public bool IsBlocked { get; set; }
    }
}
