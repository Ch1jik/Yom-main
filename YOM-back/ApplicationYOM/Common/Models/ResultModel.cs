using Newtonsoft.Json;

namespace Common.Models
{
    public class ResultModel : ResultModel<object>
    {
        public ResultModel()
        {
        }

        public ResultModel(bool success, string message = "", object data = null) : base(success, message, data)
        {
        }

        public static ResultModel Error(string message, object data = null)
        {
            return new ResultModel(false, message, data);
        }

        public static ResultModel Success(string message = "", object data = null)
        {
            return new ResultModel(true, message, data);
        }

        public static ResultModel Success(string message = "")
        {
            return new ResultModel
            {
                success = true,
                message = message,
                data = null,
            };
        }

        public string ToJsonString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class ResultModel<T> where T : class
    {
        public bool success { get; set; }
        public T data { get; set; }
        public string message { get; set; }

        public ResultModel()
        {
        }

        public ResultModel(bool success, string message, T data = null)
        {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public static explicit operator ResultModel<T>(ResultModel model)
        {
            return new ResultModel<T>(model.success, model.message, model.data as T);
        }
    }
}