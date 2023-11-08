namespace BLL.Models.Ads
{
    public class House
    {
        public ulong Id { get; set; }
        public string? BuildingsType { get; set; }
        public string? Furniture { get; set; }
        public string? Renovation { get; set; }
        public string? Heating { get; set; }
        public uint? FloorSize { get; set; }
        public uint? RoomCount { get; set; }
        public uint? Floor { get; set; }
        public double? Square { get; set; }
        public double? HouseSquare { get; set; }
        public double? KitchenSquare { get; set; }
        public string? Realtor { get; set; }
        public double? Price { get; set; }
        public string? City { get; set; }
    }
}
