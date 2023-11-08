using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;

namespace DAL.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly YomContext _context;
        private IRepository<Ad> _adRepository;
        private IRepository<Category> _categoryRepository;
        private IRepository<SubCategory> _subCategoryRepository;
        private IRepository<FavoriteAd> _favoriteAdRepository;
        private IRepository<UserReview> _userReviewRepository;
        private IRepository<UserHelpReport> _userHelpReportRepository;
        private IRepository<Purchase> _purchaseRepository;
        private IRepository<Banner> _bannerRepository;
        private IUserRepository _userRepository;
        private IPaymentRepository _paymentRepository;
        
        private IRepository<Conversation> _conversationRepository;
        private IMessageRepository _chatMessageRepository;
        private IRepository<UserConversation> _userConversationRepository;

        private IRepository<LastViewedHistory> _lastViewedHistoryRepository;

        public IRepository<Ad> AdRepository => _adRepository ?? (_adRepository = new AdRepository(_context));

        public IUserRepository UserRepository => _userRepository ?? (_userRepository = new UserRepository(_context));

        public IRepository<Category> CategoryRepository => _categoryRepository ?? (_categoryRepository = new CategoryRepository(_context));

        public IRepository<SubCategory> SubCategoryRepository => _subCategoryRepository ?? (_subCategoryRepository = new SubCategoryRepository(_context));

        public IRepository<FavoriteAd> FavoriteAdRepository => _favoriteAdRepository ?? (_favoriteAdRepository = new FavoriteAdRepository(_context));

        public IRepository<UserReview> UserReviewRepository => _userReviewRepository ?? (_userReviewRepository = new UserReviewRepository(_context));

        public IRepository<UserHelpReport> UserHelpReportRepository => _userHelpReportRepository ?? (_userHelpReportRepository = new UserHelpReportRepository(_context));

        public IRepository<LastViewedHistory> LastViewedHistoryRepository => _lastViewedHistoryRepository ?? (_lastViewedHistoryRepository = new LastViewedHistoryRepository(_context));

        public IRepository<Purchase> PurchaseRepository => _purchaseRepository ?? (_purchaseRepository = new PurchaseRepository(_context));

        public IRepository<Banner> BannerRepository => _bannerRepository ?? (_bannerRepository = new BannerRepository(_context));

        public IPaymentRepository PaymentRepository =>
            _paymentRepository ?? (_paymentRepository = new PaymentRepository(_context));
        public IRepository<Conversation> ConversationRepository => _conversationRepository ?? (_conversationRepository = new ConversationRepository(_context));
        public IMessageRepository ChatMessageRepository => _chatMessageRepository ?? (_chatMessageRepository = new ChatMessageRepository(_context));

        public IRepository<UserConversation> UserConversationRepository => _userConversationRepository ?? (_userConversationRepository = new UserConversationRepository(_context));

        public UnitOfWork(YomContext context)
        {
            _context = context;
        }

        public async Task SaveAsync()
        { 
            await _context.SaveChangesAsync();
        }
    }
}