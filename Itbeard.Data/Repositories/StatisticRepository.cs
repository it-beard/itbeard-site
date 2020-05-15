using Itbeard.Data.Entites;
using Itbeard.Data.Repositories.Interfaces;

namespace Itbeard.Data.Repositories
{
    public class StatisticRepository : RepositoryBase<Statistic>, IStatisticRepository
    {
        // ReSharper disable once NotAccessedField.Local
        private readonly ApplicationDbContext context;
        
        public StatisticRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        // Can bee extended by any additional methods that do not present in RepositoryBase
    }
}