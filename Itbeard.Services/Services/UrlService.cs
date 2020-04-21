using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Itbeard.Data;
using Itbeard.Data.Entites;
using Itbeard.Data.Repositories.Interfaces;
using Itbeard.Models.Url;
using Itbeard.Services.Interfaces;

namespace Itbeard.Services.Services
{
    public class UrlService : IUrlService
    {
        private readonly IUrlRepository urlRepository;
        private readonly IMapper mapper;
        public UrlService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            urlRepository = unitOfWork.Urls;
            this.mapper = mapper;
        }
        
        public async Task<UrlModel> ReduceAsync(string targetUrl)
        {
            var oldUrl = await urlRepository.GetFirstWhereAsync( u => u.TargetUrl == targetUrl);
            var urlModel = mapper.Map<UrlModel>(oldUrl);
            if (oldUrl != null)
            {
                urlModel.StatusCode = HttpStatusCode.OK;
                return urlModel;
            }

            var url = new Url
            {
                Id = Guid.NewGuid(),
                ShortGuid = Guid.NewGuid().ToString().Substring(0, 7),
                TargetUrl = targetUrl
            };

            var result = await urlRepository.InsertAsync(url);
            urlModel = mapper.Map<UrlModel>(result);
            urlModel.StatusCode = HttpStatusCode.Created;

            return urlModel;
        }

        public async Task<UrlModel> GetAsync(string shortGuid)
        {
            var url = await urlRepository.GetFirstWhereAsync( u => u.ShortGuid.StartsWith(shortGuid));
            return mapper.Map<UrlModel>(url);
        }
    }
}