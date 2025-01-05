# Use the official .NET image as a base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Site/Itbeard.Site.Server/Itbeard.Site.Server.csproj", "Site/Itbeard.Site.Server/"]
RUN dotnet restore "Site/Itbeard.Site.Server/Itbeard.Site.Server.csproj"
COPY . .
WORKDIR "/src/Site/Itbeard.Site.Server"
RUN dotnet build "Itbeard.Site.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Itbeard.Site.Server.csproj" -c Release -o /app/publish

# Copy the build files to the base image and set the entry point
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Itbeard.Site.Server.dll"]