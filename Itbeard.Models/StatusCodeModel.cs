using System.Net;

namespace Itbeard.Models
{
    public class StatusCodeModel
    {
        private HttpStatusCode statusCode;
        public HttpStatusCode StatusCode
        {
            get => statusCode == default ? HttpStatusCode.BadRequest : statusCode;
            set => statusCode = value;
        }
    }
}