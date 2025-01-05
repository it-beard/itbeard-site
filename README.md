Open-source repository of ITBeard's personal website: https://itbeard.com

Built with .NET 8, Blazor WebAssembly with Server Side Rendering (SSR) on first loading.

SSL Issuer Bot: https://github.com/shibayan/appservice-acmebot

## Run locally using .NET

Run this project locally:
```
dotnet run --project ./Site/Itbeard.Site.Server/Itbeard.Site.Server.csproj
```

Run this project in watch mode:
```
dotnet watch --project ./Site/Itbeard.Site.Server/Itbeard.Site.Server.csproj run
```

## Run using Docker

Build the Docker image:
```
docker build -t itbeard-site .
```

Run the container:
```
docker run -p 8080:80 itbeard-site
```

The site will be available at http://localhost:8080

