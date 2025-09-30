using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.Components.Web;
using Toolbelt.Blazor.Extensions.DependencyInjection;
using System.Globalization;
using System.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.Services.AddTransient(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddHeadElementHelper();
builder.Services.AddLocalization();

var host = builder.Build();

#region Set Culture and Site language
CultureInfo culture;
var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");
if (result != null)
{
    culture = new CultureInfo(result);
}
else
{
    culture = await SetCulture(CultureInfo.CurrentCulture.Name, js);
}

// get lang from URL and rewrite culture
var navManager = host.Services.GetRequiredService<NavigationManager>();
var queryParams = HttpUtility.ParseQueryString(navManager.ToAbsoluteUri(navManager.Uri).Query);
var langParam = queryParams["lang"];
if (langParam != null)
{
    culture = await SetCulture(langParam, js);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

static async Task<CultureInfo> SetCulture(string lang, IJSRuntime js)
{
    CultureInfo culture;
    switch (lang)
    {
        case string s when s.StartsWith("by") || s.StartsWith("be"):
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

    return culture;
}
#endregion

await host.RunAsync();
