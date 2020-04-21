using System;

namespace Itbeard.Data.Entites
{
    public class Url
    {
        public Guid Id { get; set; }
        
        public string TargetUrl { get; set; }
        
        public string ShortGuid { get; set; }
    }
}