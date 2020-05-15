using AutoMapper;
using Itbeard.Data.Entites;
using Itbeard.Models;

namespace Itbeard.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Url, UrlModel>().ReverseMap();
            CreateMap<Statistic, StatisticModel>().ReverseMap();
        }
    }
}