using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models.Enums;
using BLL.Models.UserReviews;
using BLL.Validation.Exceptions;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BLL.Services
{
    public class UserReviewService : IUserReviewService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UserReviewService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task AddUserReviewAsync(UserReview review, IEnumerable<IFormFile>? photos)
        {
            try
            {
                var possibleReview = await _unitOfWork.UserReviewRepository.GetByParamAsync(r =>
                    r.SenderId == review.SenderId && r.ReceiverId == review.ReceiverId && r.AdId == review.AdId);
                if (possibleReview is not null)
                    throw new YOMException("You already have review on this Ad");

                var ad = await _unitOfWork.AdRepository.GetByParamAsync(a => a.Id == review.AdId) ?? 
                         throw new YOMException("Ad with this id not exist");

                if (ad.UserId != review.ReceiverId)
                    throw new YOMException("You trying do some incorrect review on Ad");
                var mappedReview = _mapper.Map<DAL.Entities.UserReview>(review);

                mappedReview.DateCreate = DateTime.Now;
                mappedReview.PhotoPaths = await _photoService.UploadPhotoAsync(photos, mappedReview);

                _unitOfWork.UserReviewRepository.Add(mappedReview);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteUserReviewAsync(string senderId, ulong id)
        {
            try
            {
                var reviewToDelete = await _unitOfWork.UserReviewRepository.GetByParamAsync(rev => rev.SenderId == senderId && rev.Id == id) ?? throw new YOMException("Review with this data not exist");
                if (reviewToDelete.PhotoPaths is not null)
                    await _photoService.DeletePhotoByPathAsync(reviewToDelete.PhotoPaths);
                await _unitOfWork.FavoriteAdRepository.DeleteById(reviewToDelete.Id);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<UserReview>> GetAllReviewByUserAsync(string userId, int pageNumber, GridSortDirection gridSortDirection)
        {
            try
            {
                var filterState =
                    FilterExtension.CreateSingleFilter("ReceiverId", GridFilterOperator.eq, userId, gridSortDirection, "DateCreate", pageNumber, null);
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var favAds = await _unitOfWork.UserReviewRepository.GetAllByQueryAsync(mappedFilterState);
                var mappedResult =_mapper.Map<IEnumerable<UserReview>>(favAds);

                foreach (var userReview in mappedResult)
                {
                    userReview.Photos = await _photoService.GetUrlAllPhotosPath(userReview.PhotoPaths);
                    userReview.SenderAvatarPath = await _photoService.GetUrlPhotoPath(userReview.SenderAvatarPath);
                }
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<UserRating> GetAllRatingsAsync(string userId)
        {
            try
            {
                var filterState =
                    FilterExtension.CreateSingleFilter("ReceiverId", GridFilterOperator.eq, userId.ToString(), GridSortDirection.asc, "ReceiverId", null, null);
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var favAds = await _unitOfWork.UserReviewRepository.GetAllByQueryAsync(mappedFilterState);

                var numbers = favAds.Select(x => x.Rating);
                var ratingToReturn = new UserRating
                {
                    Average = numbers.Average(),
                    CountOfFive = numbers.Count(u => u == 5),
                    CountOfFour = numbers.Count(u => u == 4),
                    CountOfThree = numbers.Count(u => u == 3),
                    CountOfTwo = numbers.Count(u => u == 2),
                    CountOfOne = numbers.Count(u => u == 1)
                };
                return ratingToReturn;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
