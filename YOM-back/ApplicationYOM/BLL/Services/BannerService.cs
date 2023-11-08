using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Validation.Exceptions;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Banner = BLL.Models.Banner;
using BannerState = BLL.Models.Enums.BannerState;

namespace BLL.Services
{
    public class BannerService : IBannerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public BannerService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<Banner> GetBannerByIdAsync(ulong id)
        {
            var banner = await _unitOfWork.BannerRepository.GetByParamAsync(u => u.Id == id);
            banner.PhotoPaths = await _photoService.GetUrlPhotoPath(banner.PhotoPaths);
            return _mapper.Map<Banner>(banner);
        }

        public async Task<IEnumerable<Banner>> GetAllBanners()
        {
            var banners = await _unitOfWork.BannerRepository.GetAll();
            foreach (var banner in banners)
            {
                banner.PhotoPaths = await _photoService.GetUrlPhotoPath(banner.PhotoPaths);
            }
            return _mapper.Map<IEnumerable<Banner>>(banners);
        }

        public async Task<Banner> GetBannerByCompanyAsync(string company)
        {
            var banner = await _unitOfWork.BannerRepository.GetByParamAsync(u => u.CompanyName == company);
            banner.PhotoPaths = await _photoService.GetUrlPhotoPath(banner.PhotoPaths);
            return _mapper.Map<Banner>(banner);
        }

        public async Task UpdateBannerAsync(Banner model)
        {
            try
            {
                var banner = await _unitOfWork.BannerRepository.GetByParamAsync(u => u.Id == model.Id) ?? throw new YOMException("Banner with this id not exist");
                _unitOfWork.BannerRepository.Update(UpdateBanner(model, banner));
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateBannerWithPhotoAsync(Banner model, IFormFile photo)
        {
            try
            {
                var banner = await _unitOfWork.BannerRepository.GetByParamAsync(u => u.Id == model.Id) ?? throw new YOMException("Banner with this id not exist");

                await _photoService.DeletePhotoByPathAsync(model.PhotoPaths);
                model.PhotoPaths = await _photoService.UploadPhotoAsync(photo, model);
                
                _unitOfWork.BannerRepository.Update(UpdateBanner(model, banner));
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteBannerAsync(ulong id)
        {
            try
            {
                var banner = await _unitOfWork.BannerRepository.GetByParamAsync(b => b.Id == id);
                await _photoService.DeletePhotoByPathAsync(banner.PhotoPaths);
                await _unitOfWork.AdRepository.DeleteById(id);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task CreateBannerAsync(Banner banner, IFormFile photo)
        {
            try
            {
                banner.PhotoPaths = await _photoService.UploadPhotoAsync(photo, banner);
                banner.DateExpired = DateTime.Now.AddMonths(1);
                banner.BannerState = BannerState.OnReview;
                var mappedBanner = _mapper.Map<DAL.Entities.Banner>(banner);
                _unitOfWork.BannerRepository.Add(mappedBanner);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateBannerState(ulong bannerId, BannerState bannerState)
        {
            try
            {
                var banner = await _unitOfWork.BannerRepository.GetByParamAsync(u => u.Id == bannerId) ?? throw new YOMException("Banner with this id not exist");
                banner.BannerState = _mapper.Map<DAL.Entities.BannerState>(bannerState);
                _unitOfWork.BannerRepository.Update(banner);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task AddClicksToBanner(ulong id)
        {
            try
            {
                var banner = await _unitOfWork.BannerRepository.GetByParamAsync(b => b.Id == id);
                if (banner is null)
                    throw new YOMException("Banner with this id not exits");
                banner.ClicksCount++;
                _unitOfWork.BannerRepository.Update(banner);
                await _unitOfWork.SaveAsync();

            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        private DAL.Entities.Banner UpdateBanner(Banner model, DAL.Entities.Banner banner)
        {
            banner.CompanyName = model.CompanyName;
            banner.Description = model.Description;
            banner.BannerAdvertisementPlan = _mapper.Map<DAL.Entities.BannerAdvertisementPlan>(banner.BannerAdvertisementPlan);
            banner.Header = model.Header;
            banner.Email = model.Email;
            banner.PhoneNumber = model.PhoneNumber;
            banner.LinkToCompany = model.LinkToCompany;
            return banner;
        }
    }
}
