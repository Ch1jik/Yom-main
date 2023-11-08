namespace DAL.Entities
{
    public class Auto
    {
        public ulong Id { get; set; }
        public string? Model { get; set; }
        public string? Type { get; set; }
        public string? SaleCondition { get; set; }
        public string? Brand { get; set; }
        public string? Color { get; set; }
        public uint? ReleaseDate { get; set; }
        public double? Mileage { get; set; }
        public string? FuelType { get; set; }
        public string? Gearbox { get; set; }
        public uint? SeatCount { get; set; }
        public string? BodyType { get; set; }
        public bool? IsCleared { get; set; }
        public string? CarFrom { get; set; }
        public string? TechnicalState { get; set; }
        public double? Price { get; set; }
    }
}
