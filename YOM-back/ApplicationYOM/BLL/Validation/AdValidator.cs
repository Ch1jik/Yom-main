using BLL.Models.Ads;
using BLL.Validation.Exceptions;

namespace BLL.Validation
{
    public class AdValidator
    {
        public static bool CheckAdData(Ad ad)
        {
            if (string.IsNullOrWhiteSpace(ad.Title) || ad.Title.Length < 3)
                throw new AdException("This title is invalid");

            if (string.IsNullOrWhiteSpace(ad.Description) || ad.Description.Length < 10)
                throw new AdException("This description is invalid");

            if (ad.Price < 0)
                throw new AdException("This price is invalid");

            if (ad.CategoryId < 0)
                throw new AdException("You need to choose category");

            if (ad.SubCategoryId < 0)
                throw new AdException("You need to choose subcategory");
            return true;
        }
    }
}
