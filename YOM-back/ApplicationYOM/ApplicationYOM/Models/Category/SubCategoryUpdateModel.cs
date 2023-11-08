namespace PL.Models.Category
{
    public class SubCategoryUpdateModel
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? CategoryId { get; set; }
    }
}
