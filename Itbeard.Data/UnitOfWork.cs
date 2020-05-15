using System;
using Itbeard.Data.Repositories;
using Itbeard.Data.Repositories.Interfaces;

namespace Itbeard.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;
        private IUrlRepository urlRepository;
        private IStatisticRepository statisticRepository;

        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IUrlRepository Urls => urlRepository = urlRepository ?? new UrlRepository(context);
        
        public IStatisticRepository Statistics => statisticRepository = statisticRepository ?? new StatisticRepository(context);

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }

            this.disposed = true;
        }
    }
}