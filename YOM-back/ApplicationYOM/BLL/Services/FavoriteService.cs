using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Validation.Exceptions;
using BLL.Models;
using BLL.Models.Enums;
using DAL.Interfaces;

namespace BLL.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public FavoriteService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task AddAdFavoriteAsync(FavoriteAd favorite)
        {
            try
            {
                var mappedFavorite = _mapper.Map<DAL.Entities.FavoriteAd>(favorite);
                _unitOfWork.FavoriteAdRepository.Add(mappedFavorite);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task RemoveFromFavoriteAsync(ulong adId, string userId)
        {
            try
            {
                var favoriteToRemove =
                    await _unitOfWork.FavoriteAdRepository.GetByParamAsync(fav => fav.AdId == adId && fav.UserId == userId);
                await _unitOfWork.FavoriteAdRepository.DeleteById(favoriteToRemove.Id);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<FavoriteAd>> GetAllUserFavoriteAsync(string userId, GridSortDirection gridSortDirection, int? pageNumber, int? pageSize)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("UserId", GridFilterOperator.eq, userId.ToString(), // filter
                    gridSortDirection, "DateAdded", pageNumber, pageSize); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var result = await _unitOfWork.FavoriteAdRepository.GetAllByQueryAsync(mappedFilterState);
                var mappedResult = _mapper.Map<IEnumerable<FavoriteAd>>(result);

                foreach (var favorite in mappedResult)
                {
                    favorite.PhotoPaths = await _photoService.GetUrlPhotoPath(favorite.PhotoPaths);
                }
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
