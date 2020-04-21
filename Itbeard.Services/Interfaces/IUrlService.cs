using System.Threading.Tasks;
using Itbeard.Models.Url;

namespace Itbeard.Services.Interfaces
{
    public interface IUrlService
    {
        Task<UrlModel> ReduceAsync(string targetUrl);
        Task<UrlModel> GetAsync(string shortGuid);
    }
}