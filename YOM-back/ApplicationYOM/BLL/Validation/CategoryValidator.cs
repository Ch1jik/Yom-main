using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Validation.Exceptions;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Validation
{
    public class CategoryValidator
    {
        public static bool CheckCategoryTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title) || title.Length < 3)
                throw new AdException("This title is invalid");
            return true;
        }
    }
}
