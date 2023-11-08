namespace PL.Models.Review
{
    public class UserRating
    {
        public double Average { get; set; }
        public int CountOfFive { get; set; }
        public int CountOfFour { get; set; }
        public int CountOfThree { get; set; }
        public int CountOfTwo { get; set; }
        public int CountOfOne { get; set; }
    }
}
