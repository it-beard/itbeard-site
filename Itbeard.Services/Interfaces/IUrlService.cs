using System.Threading.Tasks;
using Itbeard.Models;

namespace Itbeard.Services.Interfaces
{
    public interface IUrlService
    {
        Task<UrlModel> ReduceAsync(string targetUrl, string shortName);
        Task<UrlModel> GetAsync(string shortGuid);
    }
}