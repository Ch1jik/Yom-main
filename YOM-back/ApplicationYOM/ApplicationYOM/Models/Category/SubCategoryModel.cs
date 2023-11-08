namespace PL.Models.Category
{
    public class SubCategoryModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string? Title { get; set; }
        public string? Section { get; set; }
        public ulong Clicks { get; set; }
    }
}
