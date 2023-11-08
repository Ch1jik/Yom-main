using AutoMapper;
using BLL.Models.Ads;
using BLL.Models.Chat;
using BLL.Models.UserReviews;

namespace BLL.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Ad, DAL.Entities.Ad>();
            CreateMap<Ad, DAL.Entities.Ad>().ReverseMap();
            CreateMap<House, DAL.Entities.House>();
            CreateMap<House, DAL.Entities.House>().ReverseMap();
            CreateMap<Auto, DAL.Entities.Auto>();
            CreateMap<Auto, DAL.Entities.Auto>().ReverseMap();



            CreateMap<Models.User, DAL.Entities.ApplicationUser>();
            CreateMap<Models.User, DAL.Entities.ApplicationUser>().ReverseMap();

            CreateMap<UserReview, DAL.Entities.UserReview>();
            CreateMap<UserReview, DAL.Entities.UserReview>().ReverseMap();

            CreateMap<Models.Category, DAL.Entities.Category>();
            CreateMap<Models.Category, DAL.Entities.Category>().ReverseMap();

            CreateMap<Models.FavoriteAd, DAL.Entities.FavoriteAd>();
            CreateMap<DAL.Entities.FavoriteAd, Models.FavoriteAd>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.PhotoPaths, opt => opt.MapFrom(src => src.Ad.PathToPhotos))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Ad.Title))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Ad.Price))
                .ForMember(dest => dest.DateAdded, opt => opt.MapFrom(src => src.DateAdded));

            CreateMap<Models.SubCategory, DAL.Entities.SubCategory>();
            CreateMap<Models.SubCategory, DAL.Entities.SubCategory>().ReverseMap();

            CreateMap<Models.FavoriteAd, DAL.Entities.SubCategory>();
            CreateMap<Models.FavoriteAd, DAL.Entities.SubCategory>().ReverseMap();

            CreateMap<Models.UserHelpReport, DAL.Entities.UserHelpReport>();
            CreateMap<Models.UserHelpReport, DAL.Entities.UserHelpReport>().ReverseMap();

            CreateMap<Models.Purchase, DAL.Entities.Purchase>();
            CreateMap<DAL.Entities.Purchase, Models.Purchase>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.PhotoPaths, opt => opt.MapFrom(src => src.Ad.PathToPhotos))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Ad.Title))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Ad.City))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Ad.Address))
                .ForMember(dest => dest.AdPopularity, opt => opt.MapFrom(src => src.Ad.AdPopularity))
                .ForMember(dest => dest.PhoneClicks, opt => opt.MapFrom(src => src.Ad.PhoneClicks))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Ad.Price))
                .ForMember(dest => dest.BuyerId, opt => opt.MapFrom(src => src.BuyerId))
                .ForMember(dest => dest.SellerId, opt => opt.MapFrom(src => src.SellerId))
                .ForMember(dest => dest.PurchaseDate, opt => opt.MapFrom(src => src.PurchaseDate));


            CreateMap<Models.Banner, DAL.Entities.Banner>();
            CreateMap<Models.Banner, DAL.Entities.Banner>().ReverseMap();

            CreateMap<Models.Payment, DAL.Entities.Payment>();
            CreateMap<Models.Payment, DAL.Entities.Payment>().ReverseMap();

            // LastViewed
            CreateMap<Models.LastViewedHistory, DAL.Entities.LastViewedHistory>();
            CreateMap<DAL.Entities.LastViewedHistory, Models.LastViewedHistory>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.PhotoPaths, opt => opt.MapFrom(src => src.Ad.PathToPhotos))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Ad.Title))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Ad.Price))
                .ForMember(dest => dest.LastSeenAt, opt => opt.MapFrom(src => src.LastSeenAt));

            //Filtering
            CreateMap<Models.FilterState, DAL.Helpers.FilterState>();
            CreateMap<Models.FilterState, DAL.Helpers.FilterState>().ReverseMap();

            CreateMap<Models.Sort, DAL.Helpers.Sort >();
            CreateMap<Models.Sort, DAL.Helpers.Sort>().ReverseMap();

            CreateMap<Models.GridFilterState, DAL.Helpers.GridFilterState>();
            CreateMap<Models.GridFilterState, DAL.Helpers.GridFilterState>().ReverseMap();

            CreateMap<Models.Filter, DAL.Helpers.Filter>();
            CreateMap<Models.Filter, DAL.Helpers.Filter>().ReverseMap();
        }
    }
}
