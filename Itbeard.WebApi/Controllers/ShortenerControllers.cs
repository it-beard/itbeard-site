using System.Threading.Tasks;
using Itbeard.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Itbeard.WebApi.Controllers
{
    [ApiController]
    [Route("api/shortener")]
    public class ShortenerControllers : ControllerBase
    {
        private readonly IUrlService urlService;
        
        public ShortenerControllers(IUrlService urlService)
        {
            this.urlService = urlService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(string url)
        {
            var result = await urlService.ReduceAsync(url);

            return StatusCode((int)result.StatusCode, result);
        }
        
        [HttpGet]
        public async Task<IActionResult> Get(string shortGuid)
        {
            var result = await urlService.GetAsync(shortGuid);
            return Ok(result);
        }
    }
}