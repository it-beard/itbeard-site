using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Itbeard.Data;
using Itbeard.Data.Entites;
using Itbeard.Data.Repositories.Interfaces;
using Itbeard.Models;
using Itbeard.Services.Exceptions;
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
            if (string.IsNullOrEmpty(targetUrl))
            {
                throw new TargetUrlEmptyException("Ссылка не может быть пустой!");
            }

            targetUrl = targetUrl.Trim();

            // Remove last slash symbol in url
            if (targetUrl.EndsWith('/'))
            {
                targetUrl = targetUrl.Remove(targetUrl.Length - 1, 1);
            }

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
                ShortName = Guid.NewGuid().ToString().Substring(0, 7),
                TargetUrl = targetUrl
            };

            var result = await urlRepository.InsertAsync(url);
            urlModel = mapper.Map<UrlModel>(result);
            urlModel.StatusCode = HttpStatusCode.Created;

            return urlModel;
        }

        public async Task<UrlModel> GetAsync(string shortName)
        {
            var url = await urlRepository.GetFirstWhereAsync( u => u.ShortName.StartsWith(shortName));
            return mapper.Map<UrlModel>(url);
        }
    }
}