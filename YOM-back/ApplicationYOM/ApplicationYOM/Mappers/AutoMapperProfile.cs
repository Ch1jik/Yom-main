using AutoMapper;
using BLL.Models;
using BLL.Models.Ads;
using BLL.Models.Enums;
using BLL.Models.Chat;
using BLL.Models.UserReviews;
using PL.Models;
using PL.Models.Ad;
using PL.Models.Category;
using PL.Models.Payment;
using PL.Models.Chat;
using PL.Models.Purchase;
using PL.Models.User;
using ChatConversation = PL.Models.Chat.ChatConversation;
using Conversation = PL.Models.Chat.Conversation;

namespace PL.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Ad
            CreateMap<AdModel, Ad>();
            CreateMap<AdModel, Ad>().ReverseMap();
            CreateMap<AdCreateModel, Ad>();
            CreateMap<AdCreateHouseModel, Ad>();
            CreateMap<AdCreateAutoModel, Ad>();
            CreateMap<PL.Models.Ad.House, BLL.Models.Ads.House>();
            CreateMap<PL.Models.Ad.House, BLL.Models.Ads.House>().ReverseMap();
            CreateMap<PL.Models.Ad.Auto, BLL.Models.Ads.Auto>();
            CreateMap<PL.Models.Ad.Auto, BLL.Models.Ads.Auto>().ReverseMap();
            CreateMap<AdUpdateModel, Ad>();
            CreateMap<AdUpdateAutoModel, Ad>();
            CreateMap<AdUpdateHouseModel, Ad>();
            CreateMap<Ad, AdPopular>().ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.PathToPhotos, opt => opt.MapFrom(src => src.PathToPhotos))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price));


            // Category
            CreateMap<CategoryUpdateModel, BLL.Models.Category>();
            CreateMap<CategoryUpdateModel, BLL.Models.Category>().ReverseMap();
            CreateMap<CategoryAddModel, BLL.Models.Category>().ReverseMap();

            CreateMap<CategoryModel, BLL.Models.Category>();
            CreateMap<CategoryModel, BLL.Models.Category>().ReverseMap();

            // SubCategory
            CreateMap<SubCategoryUpdateModel, BLL.Models.SubCategory>();
            CreateMap<SubCategoryUpdateModel, BLL.Models.SubCategory>().ReverseMap();
            CreateMap<SubCategoryModel, BLL.Models.SubCategory>();
            CreateMap<SubCategoryModel, BLL.Models.SubCategory>().ReverseMap();

            // FavoriteAd
            CreateMap<Models.Favorite.FavoriteAdCreate, BLL.Models.FavoriteAd>();
            CreateMap<Models.Favorite.FavoriteAd, BLL.Models.FavoriteAd>();
            CreateMap<Models.Favorite.FavoriteAd, BLL.Models.FavoriteAd>().ReverseMap();

            // UserReview
            CreateMap<Models.Review.UserReview, UserReview>().ReverseMap();
            CreateMap<UserReview, Models.Review.UserReview>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.AdTitle, opt => opt.MapFrom(src => src.AdTitle))
                .ForMember(dest => dest.DateCreate, opt => opt.MapFrom(src => src.DateCreate))
                .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.ReceiverId, opt => opt.MapFrom(src => src.ReceiverId))
                .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
                .ForMember(dest => dest.SenderAvatarPath, opt => opt.MapFrom(src => src.SenderAvatarPath))
                .ForMember(dest => dest.SenderUserName, opt => opt.MapFrom(src => src.SenderUserName))
                .ForMember(dest => dest.ReviewText, opt => opt.MapFrom(src => src.ReviewText));
            CreateMap<Models.Review.UserReviewAdd, UserReview>();


            CreateMap<Models.Review.UserRating, UserRating>();
            CreateMap<Models.Review.UserRating, UserRating>().ReverseMap();

            CreateMap<Models.User.User, BLL.Models.User>();
            CreateMap<Models.User.User, BLL.Models.User>().ReverseMap();
            CreateMap<EditUser, BLL.Models.User>();

            CreateMap<Models.Purchase.MakePurchaseModel, Purchase>();
            CreateMap<Models.Purchase.MakePurchaseModel, Purchase>().ReverseMap();
            CreateMap<Models.Purchase.PurchaseModel, Purchase>();
            CreateMap<Models.Purchase.PurchaseModel, Purchase>().ReverseMap();
            CreateMap<Models.Purchase.SellerModel, Purchase>().ReverseMap();

            CreateMap<Models.Banner.BannerModel, Banner>();
            CreateMap<Models.Banner.BannerAdvertisementPlan, BannerAdvertisementPlan>();
            CreateMap<Models.Banner.BannerModel, Banner>().ReverseMap();
            CreateMap<Models.Banner.CreateBannerModel, Banner>();
            CreateMap<Models.Banner.UpdateBannerModel, Banner>();

            CreateMap<Models.Banner.CreateBannerModel, Banner>();
            CreateMap<Models.Banner.UpdateBannerModel, Banner>();
            
            CreateMap<PaymentModel, Payment>();
            CreateMap<PaymentModel, Payment>().ReverseMap();
            CreateMap<CreatePaymentModel, Payment>();

            CreateMap<PinConversationModel, PinConversation>();
            CreateMap<MuteConversationModel, MuteConversation>();

            CreateMap<Conversation, BLL.Models.Chat.Conversation>();
            CreateMap<Conversation, BLL.Models.Chat.Conversation>().ReverseMap();

            CreateMap<ChatConversation, BLL.Models.Chat.ChatConversation>().ReverseMap();

            CreateMap<UserConversation, Conversation>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ConversationGuid, 
                    opt => opt.MapFrom(src=> src.Conversation.ConversationGuid))
                .ForMember(dest => dest.IsMuted, 
                    opt => opt.MapFrom(src=> src.IsMuted))
                .ForMember(dest => dest.IsBlocked, 
                    opt => opt.MapFrom(src=> src.Conversation.IsBlocked))
                .ForMember(dest => dest.LastMessageSentAt, 
                    opt => opt.MapFrom(src=> src.Conversation.LastMessageSentAt));


            CreateMap<ChatMessageModel, ChatMessage>();
            CreateMap<ChatMessageModel, ChatMessage>().ReverseMap();


            CreateMap<BlockConversationModel, BlockConversation>();
            // UserHelpReport
            CreateMap<Models.HelpReport.UserHelpReportModelCreate, BLL.Models.UserHelpReport>();
            CreateMap<Models.HelpReport.UserHelpReportModel, BLL.Models.UserHelpReport>();
            CreateMap<Models.HelpReport.UserHelpReportModel, BLL.Models.UserHelpReport>().ReverseMap();
            CreateMap<Models.HelpReport.UpdateReportStatusModel, BLL.Models.UserHelpReport>();
            CreateMap<Models.HelpReport.UpdateReportStatusModel, BLL.Models.UserHelpReport>().ReverseMap();

            // LastViewedHistory
            CreateMap<Models.LastViewed.LastViewedHistory, BLL.Models.LastViewedHistory>();
            CreateMap<Models.LastViewed.LastViewedHistory, BLL.Models.LastViewedHistory>().ReverseMap();
            CreateMap<Models.LastViewed.LastViewedHistoryAction, BLL.Models.LastViewedHistory>();

            // Filtering
            CreateMap<PL.Models.Filtering.Sort, BLL.Models.Sort>();
            CreateMap<PL.Models.Filtering.Sort, BLL.Models.Sort>().ReverseMap();

            CreateMap<PL.Models.Filtering.FilterState, BLL.Models.FilterState>();
            CreateMap<PL.Models.Filtering.FilterState, BLL.Models.FilterState>().ReverseMap();

            CreateMap<PL.Models.Filtering.GridFilterState, BLL.Models.GridFilterState>();
            CreateMap<PL.Models.Filtering.GridFilterState, BLL.Models.GridFilterState>().ReverseMap();

            CreateMap<PL.Models.Filtering.Filter, BLL.Models.Filter>();
            CreateMap<PL.Models.Filtering.Filter, BLL.Models.Filter>().ReverseMap();

        }
    }
}
