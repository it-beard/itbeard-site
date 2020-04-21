using AutoMapper;
using Itbeard.Data.Entites;
using Itbeard.Models.Url;

namespace Itbeard.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Url, UrlModel>();
        }
    }
}