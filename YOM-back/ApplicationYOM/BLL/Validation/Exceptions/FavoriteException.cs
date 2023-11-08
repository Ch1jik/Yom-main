using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation.Exceptions
{
    public class FavoriteException : Exception
    {
        public FavoriteException(string message) : base(message) { }
    }
}
