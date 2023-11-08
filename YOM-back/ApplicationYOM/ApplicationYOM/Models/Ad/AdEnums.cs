namespace PL.Models.Ad
{
    public enum AdType
    {
        Exchange = 0,
        Sale = 1,
        Free = 2
    }

    public enum AdCurrency
    {
        USD = 0,
        EUR = 1,
        UAH = 2
    }

    public enum AdState
    {
        Active = 0,
        Pending = 1,
        Deactivated = 2,
        Declined = 3
    }
    public enum AdvertisementPlan
    {
        Express = 0,
        Blitz = 1,
        Turbo = 2
    }
    public enum ProductState
    {
        New = 0,
        Renewed = 1,
        Used = 2,
        Warranty = 3
    }
}
