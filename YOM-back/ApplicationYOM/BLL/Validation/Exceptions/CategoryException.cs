using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation.Exceptions
{
    public class CategoryException : Exception
    {
        /// <summary>
        /// Ctor with single param 
        /// </summary>
        /// <param name="message">Exception message</param>
        public CategoryException(string message) : base(message) { }
    }
}
