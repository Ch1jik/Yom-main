namespace DAL.Entities
{
    public class SubCategory
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public string? Section { get; set; }
        public ulong Clicks { get; set; }
    }
}
