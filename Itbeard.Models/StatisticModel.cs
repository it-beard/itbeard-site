using System;

namespace Itbeard.Models
{
    public class StatisticModel
    {
        public Guid Id { get; set; }

        public Guid UrlId { get; set; }

        public DateTime CreatedAt { get; set; }

        public string IpAddress { get; set; }

        public string ReferrerUrl { get; set; }
        
        public string UserAgent { get; set; }

        public string Device { get; set; }

        public string DeviceBrand { get; set; }

        public string DeviceModel { get; set; }
        
        public string OperationSystem { get; set; }
        
        public string Browser { get; set; }
        
        public string City { get; set; }
        
        public string Country { get; set; }
    }
}