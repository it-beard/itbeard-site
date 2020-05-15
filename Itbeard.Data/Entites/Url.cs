using System;
using System.Collections.Generic;

namespace Itbeard.Data.Entites
{
    public class Url
    {
        public Guid Id { get; set; }
        
        public string TargetUrl { get; set; }
        
        public string ShortName { get; set; }
        
        
        public virtual List<Statistic> Statistics { get; set; }
    }
}