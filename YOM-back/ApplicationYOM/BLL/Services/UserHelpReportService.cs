using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using DAL.Interfaces;


namespace BLL.Services
{
    public class UserHelpReportService : IUserHelpReportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserHelpReportService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateHelpReportAsync(UserHelpReport model)
        {
            try
            {
                model.ReportStatus = ReportStatus.Active;
                var mappedFavorite = _mapper.Map<DAL.Entities.UserHelpReport>(model);
                _unitOfWork.UserHelpReportRepository.Add(mappedFavorite);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteHelpReportAsync(UserHelpReport model)
        {
            await _unitOfWork.UserHelpReportRepository.DeleteById(model.Id);
        }

        public async Task<UserHelpReport> GetHelpReportAsync(ulong reportId)
        {
            try
            {
                var unmappedResult =
                    await _unitOfWork.UserHelpReportRepository.GetByParamAsync(u => u.Id == reportId);
                return _mapper.Map<UserHelpReport>(unmappedResult);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<UserHelpReport>> GetAllUserReportsAsync(string userId)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("UserId", GridFilterOperator.eq, userId.ToString(), // filter
                    null, null, null, null); // sort
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var unmappedResult = await _unitOfWork.UserHelpReportRepository.GetAllByQueryAsync(mappedFilterState);
                return _mapper.Map<IEnumerable<UserHelpReport>>(unmappedResult);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<UserHelpReport>> GetAllUserReportsByStatusAsync(ReportStatus reportStatus, GridSortDirection gridSortDirection, int? pageNumber)
        {
            try
            {
                var filterState = FilterExtension.CreateSingleFilter("ReportStatus", GridFilterOperator.eq, ((int)(object)reportStatus).ToString(), // filter
                    gridSortDirection, "DateCreated", pageNumber);
                var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
                var unmappedResult = await _unitOfWork.UserHelpReportRepository.GetAllByQueryAsync(mappedFilterState);
                return _mapper.Map<IEnumerable<UserHelpReport>>(unmappedResult);
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task UpdateReportStatusAsync(UserHelpReport model)
        {
            try
            {
                // TODO : check is work?
                var result = await _unitOfWork.UserHelpReportRepository.GetByParamAsync(u => u.Id == model.Id);
                if (result != null)
                {
                    result.ReportStatus = (DAL.Entities.ReportStatus)model.ReportStatus;
                }
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
