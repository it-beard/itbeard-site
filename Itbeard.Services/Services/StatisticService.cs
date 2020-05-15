using System;
using System.Threading.Tasks;
using AutoMapper;
using Itbeard.Data;
using Itbeard.Data.Entites;
using Itbeard.Data.Repositories.Interfaces;
using Itbeard.Models;
using Itbeard.Services.Interfaces;
using MaxMind.GeoIP2;
using MaxMind.GeoIP2.Exceptions;

namespace Itbeard.Services.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly IStatisticRepository statisticRepository;
        private readonly IMapper mapper;
        public StatisticService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            statisticRepository = unitOfWork.Statistics;
            this.mapper = mapper;
        }

        public async Task SaveAsync(StatisticModel model, string rootFolder)
        {
            var entity = mapper.Map<Statistic>(model);
            try
            {
                var geoData = GetGeoData(model.IpAddress, rootFolder);
                entity.City = geoData.City;
                entity.Country = geoData.Country;
            }
            catch (AddressNotFoundException ex)
            {
                //todo: need to be logged
            }

            await statisticRepository.InsertAsync(entity);
        }

        private (string Country, string City) GetGeoData(string ipAddress, string rootFolder)
        {
            using var reader = new DatabaseReader(rootFolder + "\\GeoLite2-City.mmdb");
            var cityInfo = reader.City(ipAddress);

            return (cityInfo.Country.Name, cityInfo.City.Name);
        }
    }
}