using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Toolbelt.Blazor.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

//Add services
builder.Services.AddRazorPages();
builder.Services
    .AddControllersWithViews()
    .AddViewLocalization();
builder.Services.AddSingleton(sp =>
{
    // Get the address that the app is currently running at
    var server = sp.GetRequiredService<IServer>();
    var addressFeature = server.Features.Get<IServerAddressesFeature>();
    var baseAddress = addressFeature.Addresses.First();
    
    return new HttpClient { BaseAddress = new Uri(baseAddress) };
});
builder.Services.AddHeadElementHelper();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
// Call UseBlazorFrameworkFiles on the app builder.
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();
app.UseRouting();
  
// Change the fallback from the index.html file
app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
    endpoints.MapControllers();
    endpoints.MapFallbackToPage("/_Host");
});

app.Run();