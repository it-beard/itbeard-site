using System;
using Itbeard.Data.Repositories.Interfaces;

namespace Itbeard.Data
{
     public interface IUnitOfWork : IDisposable
    {
        IUrlRepository Urls { get; }
        
        IStatisticRepository Statistics { get; }
        
        void Save();
    }
}