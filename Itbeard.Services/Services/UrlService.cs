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
        
        public async Task<UrlModel> ReduceAsync(string targetUrl, string shortName)
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

            //if URL wit the same TargetUrl exists - return this object without insert new row into DB
            var sameTargetUrl = await urlRepository.GetFirstWhereAsync( u => u.TargetUrl == targetUrl);
            if (sameTargetUrl != null)
            {
                var result = mapper.Map<UrlModel>(sameTargetUrl);
                result.StatusCode = HttpStatusCode.OK;
                return result;
            }

            //if URL wit the same ShortName exists - return exception
            var sameShortNameUrl = await urlRepository.GetFirstWhereAsync( u => u.ShortName == shortName);
            if (sameShortNameUrl != null)
            {
                throw new TargetUrlEmptyException("Короткое имя существует. Выберите другое имя.");
            }
            
            var url = new Url
            {
                Id = Guid.NewGuid(),
                ShortName = string.IsNullOrEmpty(shortName) ? 
                    Guid.NewGuid().ToString().Substring(0, 7) : shortName,
                TargetUrl = targetUrl
            };

            await urlRepository.InsertAsync(url);
            var urlModel = mapper.Map<UrlModel>(url);
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