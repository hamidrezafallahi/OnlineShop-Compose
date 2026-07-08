# =========================================
# Backend Dockerfile - ASP.NET Core (Clean Architecture)
# Place this file at: ./BackEnd/Dockerfile
# Assumed folder structure inside ./BackEnd :
#   Api/Api.csproj
#   Application/Application.csproj
#   Infrastructure/Infrastructure.csproj
#   Domain/Domain.csproj
#   Common/Common.csproj   <-- adjust/remove if you don't have this project
# =========================================

# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only csproj files first (better layer caching -> faster rebuilds)
COPY ["Api/Api.csproj", "Api/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Common/Common.csproj", "Common/"]

RUN dotnet restore "Api/Api.csproj"

# Copy the rest of the source and publish
COPY . .
WORKDIR /src/Api
RUN dotnet publish "Api.csproj" -c Release -o /app/publish --no-restore /p:UseAppHost=false

# ---------- Runtime stage ----------
# NOTE: using the full (non-alpine) aspnet image because it ships with ICU
# support out of the box, which you need for correct Persian/culture-aware
# formatting (dates, numbers, sorting, etc). If image size matters more than
# this, switch to "8.0-alpine" and add:
#   RUN apk add --no-cache icu-libs
#   ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app


RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
# The base image already ships a group named "app" (that's what caused the
# "group 'app' already exists" build failure). This is written to be safe
# whether the group/user already exist or not.
RUN (getent group app || groupadd -r app) \
 && (getent passwd app || useradd -r -g app app)

COPY --from=build /app/publish .

# Create the uploads folder referenced in Api.csproj and give the app user access
RUN mkdir -p /app/wwwroot/uploads && chown -R app:app /app

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
# Do NOT bake real secrets into the image - these are placeholders,
# real values are injected via docker-compose environment/.env
ENV Jwt__Issuer=OnlineShop
ENV Jwt__Audience=OnlineShopUsers

EXPOSE 8080

USER app

ENTRYPOINT ["dotnet", "Api.dll"]