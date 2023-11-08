using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation.Exceptions
{
    /// <summary>
    /// YOMException class
    /// </summary>
    internal class YOMException : Exception
    {
        /// <summary>
        /// Ctor with single param 
        /// </summary>
        /// <param name="message">Exception message</param>
        public YOMException(string message) : base(message)
        {

        }
    }
}
