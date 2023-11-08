using System.Runtime.CompilerServices;
using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using DAL.Interfaces;

namespace BLL.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public PurchaseService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task MakePurchase(Purchase model)
        {
            try
            {
                if(await _unitOfWork.UserRepository.GetByParamAsync(u=> u.Id == model.BuyerId) is null)
                     throw new YOMException("User with this id not exist");
                var ad = await _unitOfWork.AdRepository.GetByParamAsync(u => u.Id == model.AdId);
                if (ad is null)
                    throw new YOMException("Ad with this id not exist");
                model.PurchaseDate = DateTime.Now;
                model.SellerId = ad.UserId;
                var mappedModel = _mapper.Map<DAL.Entities.Purchase>(model);
                _unitOfWork.PurchaseRepository.Add(mappedModel);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Purchase>> GetUserPurchase(string userId, int? pageNumber, int? pageSize)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("BuyerId", GridFilterOperator.eq, userId, // filter
                    GridSortDirection.desc, "PurchaseDate", pageNumber, pageSize); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var result =  await _unitOfWork.PurchaseRepository.GetAllByQueryAsync(mappedFilterState);
                
                var mappedResult = _mapper.Map<IEnumerable<Purchase>>(result);
                foreach (var purchase in mappedResult)
                {
                    purchase.PhotoPaths = await _photoService.GetUrlPhotoPath(purchase.PhotoPaths);
                }

                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Purchase>> GetUserSales(string userId, int? pageNumber, int? pageSize)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("SellerId", GridFilterOperator.eq, userId, // filter
                    GridSortDirection.desc, "PurchaseDate", pageNumber, pageSize); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var result = await _unitOfWork.PurchaseRepository.GetAllByQueryAsync(mappedFilterState);
                var mappedResult = _mapper.Map<IEnumerable<Purchase>>(result);
                foreach (var purchase in mappedResult)
                {
                    purchase.PhotoPaths = await _photoService.GetUrlPhotoPath(purchase.PhotoPaths);
                }

                return mappedResult;
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<int> GetCountOfPurchase()
        {
            var purchases = await _unitOfWork.PurchaseRepository.GetAll();
            return purchases.Count();
        }

        public async Task DeletePurchase(ulong id)
        {
            try
            {
                await _unitOfWork.PurchaseRepository.DeleteById(id);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
