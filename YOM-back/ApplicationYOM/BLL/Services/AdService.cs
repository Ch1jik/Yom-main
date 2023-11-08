using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Ads;
using BLL.Models.Enums;
using BLL.Validation;
using BLL.Validation.Exceptions;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BLL.Services
{
    public class AdService : IAdService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        public AdService(IUnitOfWork unitOfWork, IPhotoService photoService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        public async Task AddAsync(Ad model, IEnumerable<IFormFile>? photos)
        {
            try
            {
                if (AdValidator.CheckAdData(model))
                {
                    if (photos.Count() != 0)
                        model.PathToPhotos = await _photoService.UploadPhotoAsync(photos, model);
                    model.DateCreated = model.DateModified = DateTime.Now;
                    model.AdState = AdState.Pending;
                    var mappedModel = _mapper.Map<Ad, DAL.Entities.Ad>(model);
                    mappedModel.AdPopularity = 0;
                    _unitOfWork.AdRepository.Add(mappedModel);
                    await _unitOfWork.SaveAsync();
                }
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteAsync(ulong modelId)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(ad => ad.Id == modelId);
                if (ad is null) throw new YOMException("Ad with this Id not exist");
                if (ad.PathToPhotos is not null)
                    await _photoService.DeletePhotoByPathAsync(ad.PathToPhotos);
                await _unitOfWork.AdRepository.DeleteById(modelId);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteByUserAsync(ulong modelId)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(ad => ad.Id == modelId);
                if (ad is null) throw new YOMException("Ad with this Id not exist");
                if (ad.AdState != DAL.Entities.AdState.Deactivated)
                    throw new YOMException("Ad is not Deactivated state");
                if (ad.PathToPhotos is not null)
                    await _photoService.DeletePhotoByPathAsync(ad.PathToPhotos);
                await _unitOfWork.AdRepository.DeleteById(modelId);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateAdHouseAsync(Ad model)
        {
            try
            {
                var ad = await ChangeDataAdHouse(model);
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Ad>> GetAllAsync()
        {
            try
            {
                var unmappedAds = await _unitOfWork.AdRepository.GetAll();
                return _mapper.Map<IEnumerable<Ad>>(unmappedAds);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Ad>> GetAllByQueryAsync(Models.FilterState queryAd)
        {
            try
            {
                var mappedQuery = _mapper.Map<Models.FilterState, DAL.Helpers.FilterState>(queryAd);
                var unmappedAds = await _unitOfWork.AdRepository.GetAllByQueryAsync(mappedQuery);
                var mappedResult = _mapper.Map<IEnumerable<Ad>>(unmappedAds);
                foreach (var ad in mappedResult)
                {
                    ad.Photos = await _photoService.GetUrlAllPhotosPath(ad.PathToPhotos);
                }
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task AddToPopularityAsync(ulong adId)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(a => a.Id == adId);
                if (ad is null)
                    throw new YOMException("Ad with this Id not exits");
                ad.AdPopularity++;
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<ulong> GetAdPopularityAsync(ulong adId)
        {
            var ad = await _unitOfWork.AdRepository.GetByParamAsync(u => u.Id == adId);
            if (ad is null)
                throw new YOMException("Ad with this Id not exits");
            return (ulong)ad.AdPopularity;
        }

        public async Task AddPhoneClicksAsync(ulong adId)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(a => a.Id == adId);
                if (ad is null)
                    throw new YOMException("Ad with this Id not exits");
                ad.PhoneClicks++;
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Ad>> GetTopAds(ulong categoryId, int? pageNumber, int? pageSize)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("CategoryId", GridFilterOperator.eq, categoryId.ToString(), // filter
                    GridSortDirection.desc, "AdPopularity", pageNumber, pageSize); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var result = await _unitOfWork.AdRepository.GetAllByQueryAsync(mappedFilterState);
                var mappedResult = _mapper.Map<IEnumerable<Ad>>(result);
                foreach (var ad in mappedResult)
                {
                    ad.PathToPhotos = await _photoService.GetUrlPhotoPath(ad.PathToPhotos);
                }
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task ChangeAdPlan(ulong adId, AdvertisementPlan advertisementPlan)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(a => a.Id == adId);
                ad.IsPaid = true;
                ad.AdvertisementPlan = _mapper.Map<DAL.Entities.AdvertisementPlan>(advertisementPlan);
                ad.DateModified = DateTime.Now;
                ad.PaidUntil = DaysFromPlan(advertisementPlan);
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task ChangeAdState(ulong adId, AdState state)
        {
            try
            {
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(ad => ad.Id == adId);
                if (ad is null)
                    throw new YOMException("Ad with this id not exits");
                ad.AdState = _mapper.Map<DAL.Entities.AdState>(state);
                ad.DateModified = DateTime.Now;
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Ad>> GetAdByState(AdState state, int? pageNumber, int? pageSize)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("AdState", GridFilterOperator.eq, ((int)state).ToString(), // filter
                    GridSortDirection.desc, "DateCreated", pageNumber, pageSize); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var adWithState = await _unitOfWork.AdRepository.GetAllByQueryAsync(mappedFilterState);
                var mappedResult = _mapper.Map<IEnumerable<Ad>>(adWithState);
                foreach (var ad in mappedResult)
                {
                    ad.Photos = await _photoService.GetUrlAllPhotosPath(ad.PathToPhotos);
                }
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        private DateTime DaysFromPlan(AdvertisementPlan advertisementPlan)
        {
            var dateTime = DateTime.Now;
            return advertisementPlan switch
            {
                AdvertisementPlan.Express => dateTime.AddDays(3),
                AdvertisementPlan.Blitz => dateTime.AddDays(8),
                AdvertisementPlan.Turbo => dateTime.AddDays(30),
                _ => dateTime
            };
        }

        public async Task<IEnumerable<Ad>> GetByUserId(string userId, int? pageNumber, int? pageSize)
        {
            var filterState = FilterExtension.CreateSingleFilter("UserId", GridFilterOperator.eq, userId, // filter
                GridSortDirection.desc, "DateCreated", pageNumber, pageSize); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var unmappedAds = await _unitOfWork.AdRepository.GetAllByQueryAsync(mappedFilterState);
            var mappedResult = _mapper.Map<IEnumerable<Ad>>(unmappedAds);
            foreach (var ad in mappedResult)
            {
                var photo = await _photoService.GetUrlPhotoPath(ad.PathToPhotos);
                ad.Photos = new List<string> {photo};
            }
            return mappedResult;
        }

        public async Task<SubCategory> GetAdCategoryInfo(int id)
        {
            var unmappedAd =
                await _unitOfWork.SubCategoryRepository.GetByParamAsync(category => category!.Category.Id == id);
            return _mapper.Map<SubCategory>(unmappedAd);
        }

        public async Task UpdateAdWithPhotosAsync(Ad model, IEnumerable<IFormFile>? photos)
        {
            try
            {
                var ad = await ChangeDataAd(model);

                try
                {
                    if (ad.PathToPhotos is not null)
                        await _photoService.DeletePhotoByPathAsync(ad.PathToPhotos);
                    ad.PathToPhotos = await _photoService.UploadPhotoAsync(photos, ad, null);
                }
                catch (Exception ex)
                {
                    throw new YOMException(ex.Message);
                }

                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateAdAsync(Ad model)
        {
            try
            {
                var ad = await ChangeDataAd(model);
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateAdAutoAsync(Ad model)
        {
            try
            {
                var ad = await ChangeDataAdAuto(model);
                _unitOfWork.AdRepository.Update(ad);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        private async Task<DAL.Entities.Ad> ChangeDataAdAuto(Ad model)
        {
            var ad = await ChangeDataAd(model);
            if (model.Auto is null) 
                throw new YOMException("Nothing to update in Auto properties");
            ad.Auto = _mapper.Map<DAL.Entities.Auto>(model.Auto);
            return ad;
        }

        private async Task<DAL.Entities.Ad> ChangeDataAdHouse(Ad model)
        {
            var ad = await ChangeDataAd(model);
            if (model.House is null)
                throw new YOMException("Nothing to update in Auto properties");
            ad.House = _mapper.Map<DAL.Entities.House>(model.House);
            return ad;
        }

        private async Task<DAL.Entities.Ad> ChangeDataAd(Ad model)
        {
            var ad = await _unitOfWork.AdRepository.GetByParamAsync(a => a.Id == model.Id);
            if (ad is null)
                throw new YOMException("Ad with this id not exits");
            ad.DateModified = DateTime.Now;
            ad.AdState = DAL.Entities.AdState.Pending;
            ad.Title = model.Title;
            ad.Description = model.Description;
            ad.Price = model.Price;
            ad.City = model.City;
            if (model.Address is not null)
                ad.Address = model.Address;
            ad.Currency = _mapper.Map<DAL.Entities.AdCurrency>(model.Currency);
            ad.ProductState = _mapper.Map<DAL.Entities.ProductState>(model.ProductState);
            ad.CategoryId = model.CategoryId;
            ad.SubCategoryId = model.SubCategoryId;
            return ad;
        }
    }
}
