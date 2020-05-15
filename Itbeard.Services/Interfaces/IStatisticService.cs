using System.Threading.Tasks;
using Itbeard.Models;

namespace Itbeard.Services.Interfaces
{
    public interface IStatisticService
    {
        Task SaveAsync(StatisticModel model, string rootFolder);
    }
}