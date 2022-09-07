using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Toolbelt.Blazor.Extensions.DependencyInjection;
using System.Globalization;
using Microsoft.JSInterop;


var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddTransient(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddHeadElementHelper();
builder.Services.AddLocalization();

var host = builder.Build();

CultureInfo culture;
var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");

if (result != null)
{
    culture = new CultureInfo(result);
}
else
{
    switch (CultureInfo.CurrentCulture.Name)
    {
        case string s when s.StartsWith("be"):
            culture = new CultureInfo("be");
            await js.InvokeVoidAsync("blazorCulture.set", "be");
            break;
        case string s when s.StartsWith("en"):
            culture = new CultureInfo("en");
            await js.InvokeVoidAsync("blazorCulture.set", "en");
            break;
        case string s when s.StartsWith("ru"):
            culture = new CultureInfo("ru");
            await js.InvokeVoidAsync("blazorCulture.set", "ru");
            break;
        default:
            culture = new CultureInfo("ru");
            await js.InvokeVoidAsync("blazorCulture.set", "ru");
            break;
    }
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
            