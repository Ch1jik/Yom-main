using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BLL.Validation
{
    public class ImageValidator
    {
        public static bool IsImage(IFormFile file)
        {
            return file.Length > 0 && file.ContentType.Contains("image");
        }
    }
}
