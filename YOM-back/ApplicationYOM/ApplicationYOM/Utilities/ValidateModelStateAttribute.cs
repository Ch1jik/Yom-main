using Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace PL.Utilities
{
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = context.ModelState.Keys
                               .SelectMany(key => context.ModelState[key]!.Errors.Select(x => x.ErrorMessage)).ToList();

                context.Result = new BadRequestObjectResult(new ResultModel
                {
                    success = false,
                    message = JsonConvert.SerializeObject(errors).Replace("\"", "")
                });
            }
        }
    }
}