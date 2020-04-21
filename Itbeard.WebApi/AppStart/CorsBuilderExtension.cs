using Microsoft.AspNetCore.Builder;

namespace Itbeard.WebApi.AppStart
{
    public static class CorsBuilderExtension
    {
        public static void UseConfiguredCors(this IApplicationBuilder app)
        {
            app.UseCors(
                b =>
                    b.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
        }
    }
}