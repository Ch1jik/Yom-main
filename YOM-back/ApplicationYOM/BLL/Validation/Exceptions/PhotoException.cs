using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation.Exceptions
{
    public class PhotoException : Exception
    {
        public PhotoException(string message) : base(message) { }
    }
}
