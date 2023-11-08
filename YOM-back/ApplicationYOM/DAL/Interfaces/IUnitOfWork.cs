using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<Ad> AdRepository { get; }
        IUserRepository UserRepository { get; }
        IRepository<Category> CategoryRepository { get; }
        IRepository<SubCategory> SubCategoryRepository { get; }
        IRepository<FavoriteAd> FavoriteAdRepository { get; }
        IRepository<UserReview> UserReviewRepository { get; }
        IRepository<UserHelpReport> UserHelpReportRepository { get; }
        IRepository<LastViewedHistory> LastViewedHistoryRepository { get; }
        IRepository<Purchase> PurchaseRepository{ get; }
        IRepository<Banner> BannerRepository{ get; }
        IPaymentRepository PaymentRepository { get; }
        IRepository<Conversation> ConversationRepository { get; }
        IRepository<UserConversation> UserConversationRepository { get; }
        IMessageRepository ChatMessageRepository { get; }
        Task SaveAsync();
    }
}
