namespace BLL.Validation.Exceptions
{
    public class AdException : Exception
    {
        /// <summary>
        /// Ctor with single param 
        /// </summary>
        /// <param name="message">Exception message</param>
        public AdException(string message) : base(message) { }
    }
}
