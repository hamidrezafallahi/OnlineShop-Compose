FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["Api/Api.csproj", "Api/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Common/Common.csproj", "Common/"]
RUN dotnet restore "Api/Api.csproj"
COPY . .
WORKDIR /src/Api
RUN dotnet publish "Api.csproj" -c Release -o /app/publish --no-restore /p:UseAppHost=false
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
RUN (getent group app || groupadd -r app) \
 && (getent passwd app || useradd -r -g app app)
COPY --from=build /app/publish .
RUN mkdir -p /app/wwwroot/uploads && chown -R app:app /app
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENV Jwt__Issuer=OnlineShop
ENV Jwt__Audience=OnlineShopUsers
EXPOSE 8080
USER app
ENTRYPOINT ["dotnet", "Api.dll"]