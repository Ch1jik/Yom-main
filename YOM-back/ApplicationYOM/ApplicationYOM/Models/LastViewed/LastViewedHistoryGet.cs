namespace PL.Models.LastViewed
{
    public class LastViewedHistoryGet
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
