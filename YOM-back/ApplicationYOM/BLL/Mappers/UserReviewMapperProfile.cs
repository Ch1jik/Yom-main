using AutoMapper;
using BLL.Models.UserReviews;

namespace BLL.Mappers
{
    public class UserReviewMapperProfile : Profile
    {
        public UserReviewMapperProfile()
        {
            CreateMap<DAL.Entities.UserReview, UserReview>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AdId, opt => opt.MapFrom(src => src.AdId))
                .ForMember(dest => dest.AdTitle, opt => opt.MapFrom(src => src.Ad.Title))
                .ForMember(dest => dest.DateCreate, opt => opt.MapFrom(src => src.DateCreate))
                .ForMember(dest => dest.PhotoPaths, opt => opt.MapFrom(src => src.PhotoPaths))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.ReceiverId, opt => opt.MapFrom(src => src.ReceiverId))
                .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
                .ForMember(dest => dest.SenderAvatarPath, opt => opt.MapFrom(src => src.Sender.AvatarPath))
                .ForMember(dest => dest.SenderUserName, opt => opt.MapFrom(src => src.Sender.UserName))
                .ForMember(dest => dest.ReviewText, opt => opt.MapFrom(src => src.ReviewText));
        }
    }
}
