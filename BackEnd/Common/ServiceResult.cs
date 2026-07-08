namespace Common
{
    public class ServiceResponse
    {
        public bool IsSuccess { get; set; }
        public string Error { get; set; }

        public static ServiceResponse Ok()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Error = null
            };
        }

        public static ServiceResponse Failed(string error)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Error = error
            };
        }
    }

    public class ServiceResult<T> : ServiceResponse where T : class
    {
        public T Data { get; set; }

        public static ServiceResult<T> Ok(T data)
        {
            return new ServiceResult<T>
            {
                IsSuccess = true,
                Data=data,
                Error = null
            };
        }

        public static ServiceResult<T> Failed(string error)
        {
            return new ServiceResult<T>
            {
                IsSuccess = false,
                Error = error
            };
        }

    }
}
