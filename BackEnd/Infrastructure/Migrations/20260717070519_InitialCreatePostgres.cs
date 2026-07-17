using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreatePostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LogoUrl = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PersianName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EnglishName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ParentCategoryId = table.Column<int>(type: "integer", nullable: true),
                    ImageUrl = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CategoryPersianDesc = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CategoryEnglishDesc = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IsShowInLanding = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DiscountCode",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    IsPercent = table.Column<bool>(type: "boolean", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UsageLimit = table.Column<int>(type: "integer", nullable: true),
                    UsedCount = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountCode", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    IsPercent = table.Column<bool>(type: "boolean", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EntityName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PersianDisplayName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    EnglishDisplayName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    EndPoint = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    EntityIconBase64 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormFieldsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionsJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ColumnsJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsOnline = table.Column<bool>(type: "boolean", nullable: false),
                    ConfigJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethod", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShippingMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(800)", maxLength: 800, nullable: true),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    EstimatedDeliveryTime = table.Column<int>(type: "integer", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Slides",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BannerUrl = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    BannerTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    BannerDescrioption = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: false),
                    FirstUrl = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    SecondUrl = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IsHero = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slides", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    BrandId = table.Column<int>(type: "integer", nullable: true),
                    Dimensions_Width = table.Column<decimal>(type: "numeric(10,2)", nullable: true),
                    Dimensions_Height = table.Column<decimal>(type: "numeric(10,2)", nullable: true),
                    Dimensions_Depth = table.Column<decimal>(type: "numeric(10,2)", nullable: true),
                    Dimensions_Weight = table.Column<decimal>(type: "numeric(10,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FullName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    Image = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    UserDescription = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductImages_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductSpecification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Key = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSpecification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductSpecification_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    State = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PostalCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    FullAddress = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TitleFa = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IntroFa = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ContentFa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConclusionFa = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ExcerptFa = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    TitleEn = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IntroEn = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ContentEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConclusionEn = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ExcerptEn = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    MetaDescriptionFa = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    MetaDescriptionEn = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    MetaKeywordsFa = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    MetaKeywordsEn = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    Slug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ThumbnailFile = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AuthorId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Blogs_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TargetId = table.Column<int>(type: "integer", nullable: false),
                    TargetType = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    UserName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    TargetTitle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ParentName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    ParentId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Comments_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductOffers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    SupplierId = table.Column<int>(type: "integer", nullable: false),
                    BasePrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Inventory = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOffers_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOffers_Users_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TargetId = table.Column<int>(type: "integer", nullable: false),
                    TargetType = table.Column<int>(type: "integer", nullable: false),
                    RateValue = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rates_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AccessToken = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AccessTokenExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRevoked = table.Column<bool>(type: "boolean", nullable: false),
                    ReplacedByToken = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedByIp = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreatedByUserAgent = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserTags_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DiscountCodeId = table.Column<int>(type: "integer", nullable: true),
                    ShippingAddressId = table.Column<int>(type: "integer", nullable: false),
                    ShippingMethodId = table.Column<int>(type: "integer", nullable: false),
                    PaymentMethodId = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ShippingCost = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    FinalPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    TrackingCode = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Addresses_ShippingAddressId",
                        column: x => x.ShippingAddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_DiscountCode_DiscountCodeId",
                        column: x => x.DiscountCodeId,
                        principalTable: "DiscountCode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Orders_PaymentMethod_PaymentMethodId",
                        column: x => x.PaymentMethodId,
                        principalTable: "PaymentMethod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_ShippingMethods_ShippingMethodId",
                        column: x => x.ShippingMethodId,
                        principalTable: "ShippingMethods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BlogTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BlogId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogTags_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BlogTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CartId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ProductOfferId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_ProductOffers_ProductOfferId",
                        column: x => x.ProductOfferId,
                        principalTable: "ProductOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CartItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductOfferDiscount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductOfferId = table.Column<int>(type: "integer", nullable: false),
                    DiscountId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOfferDiscount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOfferDiscount_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOfferDiscount_ProductOffers_ProductOfferId",
                        column: x => x.ProductOfferId,
                        principalTable: "ProductOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOfferTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductOfferId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOfferTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOfferTags_ProductOffers_ProductOfferId",
                        column: x => x.ProductOfferId,
                        principalTable: "ProductOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOfferTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpecialOffers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductOfferId = table.Column<int>(type: "integer", nullable: false),
                    DiscountId = table.Column<int>(type: "integer", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecialOffers_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SpecialOffers_ProductOffers_ProductOfferId",
                        column: x => x.ProductOfferId,
                        principalTable: "ProductOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductOfferId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_ProductOffers_ProductOfferId",
                        column: x => x.ProductOfferId,
                        principalTable: "ProductOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PaymentMethodId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TransactionId = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payment_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payment_PaymentMethod_PaymentMethodId",
                        column: x => x.PaymentMethodId,
                        principalTable: "PaymentMethod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "EntityConfigs",
                columns: new[] { "Id", "ActionsJson", "ColumnsJson", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "EndPoint", "EnglishDisplayName", "EntityIconBase64", "EntityName", "FormFieldsJson", "IsActive", "PersianDisplayName", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { 1, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"Slug\",\"Accessor\":\"slug\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Accessor\":\"titleFa\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Accessor\":\"thumbnailFile\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "blogs", "Blog", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z\" />\r\n</svg>", "blogs", "[{\"Name\":\"titleFa\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0645\\u0639\\u0631\\u0641\\u06CC \\u0645\\u062D\\u0635\\u0648\\u0644 \\u062C\\u062F\\u06CC\\u062F\",\"Help\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"introFa\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"contentFa\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0645\\u062A\\u0646 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionFa\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptFa\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0686\\u06A9\\u06CC\\u062F\\u0647\\u200C\\u0627\\u06CC \\u06A9\\u0648\\u062A\\u0627\\u0647 \\u0627\\u0632 \\u0628\\u0644\\u0627\\u06AF\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionFa\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 160 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsFa\",\"Caption\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0628\\u0627 \\u06A9\\u0627\\u0645\\u0627 \\u062C\\u062F\\u0627 \\u0634\\u0648\\u0646\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"titleEn\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"New Product Introduction\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"introEn\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog introduction\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"contentEn\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog content\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionEn\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog conclusion\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptEn\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Short blog summary\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionEn\",\"Caption\":\"Meta Description\",\"Type\":\"text\",\"PlaceHolder\":\"Max 160 characters\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsEn\",\"Caption\":\"Meta Keywords\",\"Type\":\"text\",\"PlaceHolder\":\"keyword1, keyword2\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"slug\",\"Caption\":\"Slug\",\"Type\":\"text\",\"PlaceHolder\":\"new-product-introduction\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0622\\u062F\\u0631\\u0633 URL \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"Slug \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"thumbnailFile\",\"Caption\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Type\":\"file\",\"PlaceHolder\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"jpg, png (\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 2MB)\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"authorId\",\"Caption\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":null,\"Help\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647 \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":null}]", true, "بلاگ‌ها", null, null },
                    { 2, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0628\\u0631\\u0646\\u062F\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0644\\u0648\\u06AF\\u0648\",\"Accessor\":\"logoFile\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\",\"Accessor\":\"description\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "brands", "Brand", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z\" />\r\n</svg>", "brands", "[{\"Name\":\"name\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0628\\u0631\\u0646\\u062F\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0633\\u0627\\u0645\\u0633\\u0648\\u0646\\u06AF\",\"Help\":\"\\u0646\\u0627\\u0645 \\u0628\\u0631\\u0646\\u062F \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0628\\u0631\\u0646\\u062F \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"minLength\",\"Condition\":\"2\",\"Message\":\"\\u062D\\u062F\\u0627\\u0642\\u0644 \\u062F\\u0648 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\"}]},{\"Name\":\"logoFile\",\"Caption\":\"\\u0644\\u0648\\u06AF\\u0648\",\"Type\":\"file\",\"PlaceHolder\":\"\\u0644\\u0648\\u06AF\\u0648\\u06CC \\u0628\\u0631\\u0646\\u062F \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0641\\u0631\\u0645\\u062A\\u200C\\u0647\\u0627\\u06CC \\u0645\\u062C\\u0627\\u0632: jpg, png, svg\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"description\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D \\u06A9\\u0648\\u062A\\u0627\\u0647\\u06CC \\u062F\\u0631\\u0628\\u0627\\u0631\\u0647 \\u0628\\u0631\\u0646\\u062F \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F...\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null}]", true, "برندها", null, null },
                    { 3, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0633\\u062A\\u0647 \\u0648\\u0627\\u0644\\u062F\",\"Accessor\":\"parentCategoryId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0627\\u06CC\\u062C\\u0627\\u062F\",\"Accessor\":\"createdAt\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "categories", "Category", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z\" />\r\n</svg>", "categories", "[{\"Name\":\"persianName\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646\",\"Help\":\"\\u0646\\u0627\\u0645 \\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"minLength\",\"Condition\":\"2\",\"Message\":\"\\u062D\\u062F\\u0627\\u0642\\u0644 \\u062F\\u0648 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\"}]},{\"Name\":\"englishName\",\"Caption\":\"English category name\",\"Type\":\"text\",\"PlaceHolder\":\"example: cars\",\"Help\":\"insert english category name\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"english name is required\"},{\"Rule\":\"minLength\",\"Condition\":\"2\",\"Message\":\"at least insert two characters\"}]},{\"Name\":\"categoryCover\",\"Caption\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC\",\"Type\":\"file\",\"PlaceHolder\":\"example: car.jpg\",\"Help\":\"add an image\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"categoryPersianDesc\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0627\\u06CC\\u0646 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0627\\u0644:\\u0627\\u06CC\\u0646 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0631\\u0627\\u06CC...\",\"Help\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\\u06CC \\u062F\\u0631 \\u062E\\u0635\\u0648\\u0635 \\u0627\\u06CC\\u0646 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0645\\u06CC\\u0628\\u0627\\u0634\\u062F.\"},{\"Rule\":\"minLength\",\"Condition\":\"2\",\"Message\":\"\\u062D\\u062F\\u0627\\u0642\\u0644 \\u062F\\u0648 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F\"}]},{\"Name\":\"categoryEnglishDesc\",\"Caption\":\"description about this category\",\"Type\":\"text\",\"PlaceHolder\":\"example : this is category of ...\",\"Help\":\"add some info about this category\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"category description is required\"},{\"Rule\":\"minLength\",\"Condition\":\"2\",\"Message\":\"at least insert two characters\"}]},{\"Name\":\"parentCategoryId\",\"Caption\":\"\\u062F\\u0633\\u062A\\u0647 \\u0648\\u0627\\u0644\\u062F\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062F\\u0631 \\u0635\\u0648\\u0631\\u062A \\u0648\\u062C\\u0648\\u062F\\u060C \\u062F\\u0633\\u062A\\u0647 \\u0648\\u0627\\u0644\\u062F \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u06CC\\u062F \\u0627\\u06CC\\u0646 \\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0628\\u0647 \\u0639\\u0646\\u0648\\u0627\\u0646 \\u0632\\u06CC\\u0631\\u0645\\u062C\\u0645\\u0648\\u0639\\u0647 \\u06CC\\u06A9 \\u062F\\u0633\\u062A\\u0647 \\u062F\\u06CC\\u06AF\\u0631 \\u062A\\u0639\\u06CC\\u06CC\\u0646 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Categories/selectOption\",\"fetchFilters\":[\"id\"]},\"Options\":null,\"Rules\":null},{\"Name\":\"isShowInLanding\",\"Caption\":\"\\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0631 \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0635\\u0644\\u06CC\",\"Type\":\"checkbox\",\"PlaceHolder\":null,\"Help\":\"\\u062F\\u0631 \\u0635\\u0648\\u0631\\u062A \\u063A\\u06CC\\u0631\\u0641\\u0639\\u0627\\u0644 \\u0628\\u0648\\u062F\\u0646\\u060C \\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u062F\\u0631 \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0635\\u0644\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0627\\u062F\\u0647 \\u0646\\u0645\\u06CC\\u200C\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null}]", true, "دسته‌بندی‌ها", null, null },
                    { 4, "[\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"title\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"amount\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0631\\u0635\\u062F\\u06CC\\u061F\",\"Accessor\":\"isPercent\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639\",\"Accessor\":\"startDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646\",\"Accessor\":\"endDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A \\u0641\\u0639\\u0627\\u0644\",\"Accessor\":\"isActive\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "discounts", "Discount", "\r\n<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'>\r\n  <path stroke-linecap='round' stroke-linejoin='round' d='m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />\r\n</svg>", "discounts", "[{\"Name\":\"title\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u062A\\u0627\\u0628\\u0633\\u062A\\u0627\\u0646\\u06CC\",\"Help\":\"\\u0646\\u0627\\u0645 \\u0646\\u0645\\u0627\\u06CC\\u0634\\u06CC \\u0628\\u0631\\u0627\\u06CC \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"amount\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: 15\",\"Help\":\"\\u0639\\u062F\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0628\\u0647 \\u062A\\u0648\\u0645\\u0627\\u0646 \\u06CC\\u0627 \\u062F\\u0631\\u0635\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"min\",\"Condition\":\"1\",\"Message\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u0628\\u0627\\u06CC\\u062F \\u0628\\u0632\\u0631\\u06AF\\u200C\\u062A\\u0631 \\u0627\\u0632 \\u0635\\u0641\\u0631 \\u0628\\u0627\\u0634\\u062F\"}]},{\"Name\":\"isPercent\",\"Caption\":\"\\u0622\\u06CC\\u0627 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u062F\\u0631\\u0635\\u062F\\u06CC \\u0627\\u0633\\u062A\\u061F\",\"Type\":\"checkbox\",\"PlaceHolder\":null,\"Help\":\"\\u062F\\u0631 \\u0635\\u0648\\u0631\\u062A \\u0641\\u0639\\u0627\\u0644 \\u0628\\u0648\\u062F\\u0646\\u060C \\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0628\\u0631\\u062D\\u0633\\u0628 \\u062F\\u0631\\u0635\\u062F \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"startDate\",\"Caption\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"date\",\"PlaceHolder\":null,\"Help\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E\\u06CC \\u06A9\\u0647 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0632 \\u0622\\u0646 \\u0641\\u0639\\u0627\\u0644 \\u0645\\u06CC\\u200C\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"endDate\",\"Caption\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"date\",\"PlaceHolder\":null,\"Help\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E\\u06CC \\u06A9\\u0647 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u062A\\u0627 \\u0622\\u0646 \\u0645\\u0639\\u062A\\u0628\\u0631 \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تخفیف‌ها", null, null },
                    { 5, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC\",\"Accessor\":\"categoryName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0628\\u0631\\u0646\\u062F\",\"Accessor\":\"brandName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\",\"Accessor\":\"description\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "products", "Products", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n</svg>\r\n", "products", "[{\"Name\":\"name\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646 \\u0633\\u0627\\u0645\\u0633\\u0648\\u0646\\u06AF 55 \\u0627\\u06CC\\u0646\\u0686\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"description\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u06CC\\u062F \\u0648\\u06CC\\u0698\\u06AF\\u06CC\\u200C\\u0647\\u0627 \\u0648 \\u0645\\u0634\\u062E\\u0635\\u0627\\u062A \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"categoryId\",\"Caption\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062D\\u0635\\u0648\\u0644 \\u0628\\u0647 \\u06A9\\u062F\\u0627\\u0645 \\u062F\\u0633\\u062A\\u0647 \\u062A\\u0639\\u0644\\u0642 \\u062F\\u0627\\u0631\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Categories/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"brandId\",\"Caption\":\"\\u0628\\u0631\\u0646\\u062F\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0628\\u0631\\u0646\\u062F \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062D\\u0635\\u0648\\u0644 \\u0628\\u0647 \\u06A9\\u062F\\u0627\\u0645 \\u0628\\u0631\\u0646\\u062F \\u062A\\u0639\\u0644\\u0642 \\u062F\\u0627\\u0631\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Brands/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[]},{\"Name\":\"width\",\"Caption\":\"\\u0639\\u0631\\u0636\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0639\\u0631\\u0636 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u062F \\u062E\\u0627\\u0644\\u06CC \\u0628\\u0627\\u0634\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"height\",\"Caption\":\"\\u0637\\u0648\\u0644 \\u06CC\\u0627 \\u0627\\u0631\\u062A\\u0641\\u0627\\u0639\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0637\\u0648\\u0644 \\u06CC\\u0627 \\u0627\\u0631\\u062A\\u0641\\u0627\\u0639 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u062F \\u062E\\u0627\\u0644\\u06CC \\u0628\\u0627\\u0634\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"depth\",\"Caption\":\"\\u0639\\u0645\\u0642\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0639\\u0645\\u0642 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u062F \\u062E\\u0627\\u0644\\u06CC \\u0628\\u0627\\u0634\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"weight\",\"Caption\":\"\\u0648\\u0632\\u0646\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0648\\u0632\\u0646 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u062F \\u062E\\u0627\\u0644\\u06CC \\u0628\\u0627\\u0634\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]}]", true, "محصولات", null, null },
                    { 6, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "tags", "Tags", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z\" />\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 6h.008v.008H6V6Z\" /></svg>", "tags", "[{\"Name\":\"name\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646\\u060C \\u06AF\\u0648\\u0634\\u06CC\\u060C \\u0644\\u067E\\u200C\\u062A\\u0627\\u067E\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تگ‌ها", null, null },
                    { 7, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0645\\u0644\",\"Accessor\":\"fullName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0627\\u06CC\\u0645\\u06CC\\u0644\",\"Accessor\":\"email\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633\",\"Accessor\":\"phoneNumber\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0642\\u0634\",\"Accessor\":\"roleId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "users", "Users", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z\" />\r\n</svg>", "users", "[{\"Name\":\"fullName\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0645\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u0648 \\u0646\\u0627\\u0645 \\u062E\\u0627\\u0646\\u0648\\u0627\\u062F\\u06AF\\u06CC \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0645\\u062D\\u0645\\u062F \\u0631\\u0636\\u0627\\u06CC\\u06CC\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0645\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"email\",\"Caption\":\"\\u0627\\u06CC\\u0645\\u06CC\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"example@gmail.com\",\"Help\":\"\\u0622\\u062F\\u0631\\u0633 \\u0627\\u06CC\\u0645\\u06CC\\u0644 \\u0645\\u0639\\u062A\\u0628\\u0631 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u06CC\\u0645\\u06CC\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"email\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u06CC\\u0645\\u06CC\\u0644 \\u0646\\u0627\\u0645\\u0639\\u062A\\u0628\\u0631 \\u0627\\u0633\\u062A\"}]},{\"Name\":\"phoneNumber\",\"Caption\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633\",\"Type\":\"text\",\"PlaceHolder\":\"09123456789\",\"Help\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u0645\\u0648\\u0628\\u0627\\u06CC\\u0644 \\u0631\\u0627 \\u0628\\u062F\\u0648\\u0646 \\u0641\\u0627\\u0635\\u0644\\u0647 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"password\",\"Caption\":\"\\u0631\\u0645\\u0632 \\u0639\\u0628\\u0648\\u0631\",\"Type\":\"password\",\"PlaceHolder\":\"\\u0631\\u0645\\u0632 \\u0639\\u0628\\u0648\\u0631 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062D\\u062F\\u0627\\u0642\\u0644 \\u06F8 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0631\\u0645\\u0632 \\u0639\\u0628\\u0648\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"minLength\",\"Condition\":\"8\",\"Message\":\"\\u0631\\u0645\\u0632 \\u0639\\u0628\\u0648\\u0631 \\u0628\\u0627\\u06CC\\u062F \\u062D\\u062F\\u0627\\u0642\\u0644 \\u06F8 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u0628\\u0627\\u0634\\u062F\"}]},{\"Name\":\"roleId\",\"Caption\":\"\\u0646\\u0642\\u0634\",\"Type\":\"select\",\"PlaceHolder\":\"\\u0646\\u0642\\u0634 \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: Admin, Customer\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0642\\u0634 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "کاربران", null, null },
                    { 8, "[\"active\",\"edit\",\"delete\",\"new\",\"default\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Accessor\":\"userName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0647\\u0631\",\"Accessor\":\"city\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0627\\u0633\\u062A\\u0627\\u0646\",\"Accessor\":\"state\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u062F \\u067E\\u0633\\u062A\\u06CC\",\"Accessor\":\"postalCode\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0622\\u062F\\u0631\\u0633 \\u06A9\\u0627\\u0645\\u0644\",\"Accessor\":\"fullAddress\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u067E\\u06CC\\u0634\\u200C\\u0641\\u0631\\u0636\",\"Accessor\":\"isDefault\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "address", "User Addresses", "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#000\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z\"/></svg>", "address", "[{\"Name\":\"userId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062F\\u0631 \\u0635\\u0648\\u0631\\u062A\\u06CC \\u06A9\\u0647 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0646\\u06A9\\u0646\\u06CC\\u062F \\u0628\\u0631\\u0627\\u06CC \\u062E\\u0648\\u062F\\u062A\\u0627\\u0646 \\u0627\\u06CC\\u0646 \\u0622\\u062F\\u0631\\u0633 \\u062B\\u0628\\u062A \\u0645\\u06CC\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[]},{\"Name\":\"name\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0622\\u062F\\u0631\\u0633\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u0622\\u062F\\u0631\\u0633 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0633\\u0627\\u0632\\u0645\\u0627\\u0646\\u062F\\u0647\\u06CC \\u0628\\u0647\\u062A\\u0631 \\u0686\\u0646\\u062F \\u0622\\u062F\\u0631\\u0633 \\u0628\\u0647 \\u06A9\\u0627\\u0631 \\u0645\\u06CC\\u0631\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0622\\u062F\\u0631\\u0633 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"phoneNumber\",\"Caption\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633\",\"Type\":\"phoneNumber\",\"PlaceHolder\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"09121234567\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0634\\u0645\\u0627\\u0631\\u0647 \\u062A\\u0645\\u0627\\u0633 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"city\",\"Caption\":\"\\u0634\\u0647\\u0631\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u0634\\u0647\\u0631\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0647\\u0631\\u0627\\u0646\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0634\\u0647\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"state\",\"Caption\":\"\\u0627\\u0633\\u062A\\u0627\\u0646\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0646\\u0627\\u0645 \\u0627\\u0633\\u062A\\u0627\\u0646\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0647\\u0631\\u0627\\u0646\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0627\\u0633\\u062A\\u0627\\u0646 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"postalCode\",\"Caption\":\"\\u06A9\\u062F \\u067E\\u0633\\u062A\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u062F \\u067E\\u0633\\u062A\\u06CC \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: 1234567890\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u06A9\\u062F \\u067E\\u0633\\u062A\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"fullAddress\",\"Caption\":\"\\u0622\\u062F\\u0631\\u0633 \\u06A9\\u0627\\u0645\\u0644\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0622\\u062F\\u0631\\u0633 \\u06A9\\u0627\\u0645\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062E\\u06CC\\u0627\\u0628\\u0627\\u0646 \\u0622\\u0632\\u0627\\u062F\\u06CC\\u060C \\u067E\\u0644\\u0627\\u06A9 12\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0622\\u062F\\u0631\\u0633 \\u06A9\\u0627\\u0645\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "آدرس کاربران", null, null },
                    { 9, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0633\\u0641\\u0627\\u0631\\u0634\",\"Accessor\":\"orderId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Accessor\":\"paymentDate\",\"Type\":\"datetime\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0628\\u0644\\u063A\",\"Accessor\":\"amount\",\"Type\":\"decimal\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0631\\u0648\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Accessor\":\"paymentMethod\",\"Type\":\"enum\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A\",\"Accessor\":\"status\",\"Type\":\"enum\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u062A\\u0631\\u0627\\u06A9\\u0646\\u0634\",\"Accessor\":\"transactionId\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "payments", "Payment", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z\" /></svg>", "payments", "[{\"Name\":\"orderId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0633\\u0641\\u0627\\u0631\\u0634\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0627\\u06CC\\u0646 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0645\\u0631\\u0628\\u0648\\u0637 \\u0628\\u0647 \\u06A9\\u062F\\u0627\\u0645 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"amount\",\"Caption\":\"\\u0645\\u0628\\u0644\\u063A\",\"Type\":\"decimal\",\"PlaceHolder\":\"\\u0645\\u0628\\u0644\\u063A \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u0628\\u0644\\u063A \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0634\\u062F\\u0647 \\u062A\\u0648\\u0633\\u0637 \\u0645\\u0634\\u062A\\u0631\\u06CC\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0628\\u0644\\u063A \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"min\",\"Condition\":\"0.01\",\"Message\":\"\\u0645\\u0628\\u0644\\u063A \\u0628\\u0627\\u06CC\\u062F \\u0628\\u0632\\u0631\\u06AF\\u062A\\u0631 \\u0627\\u0632 \\u0635\\u0641\\u0631 \\u0628\\u0627\\u0634\\u062F\"}]},{\"Name\":\"paymentMethod\",\"Caption\":\"\\u0631\\u0648\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Type\":\"enum\",\"PlaceHolder\":\"\\u0631\\u0648\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0631\\u0648\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A: \\u0622\\u0646\\u0644\\u0627\\u06CC\\u0646 \\u06CC\\u0627 \\u0646\\u0642\\u062F\\u06CC\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0631\\u0648\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"status\",\"Caption\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A\",\"Type\":\"enum\",\"PlaceHolder\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Help\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A: Pending, Success, Failed, Cancelled\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"transactionId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u062A\\u0631\\u0627\\u06A9\\u0646\\u0634\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u062A\\u0631\\u0627\\u06A9\\u0646\\u0634 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u062A\\u0631\\u0627\\u06A9\\u0646\\u0634 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A \\u0622\\u0646\\u0644\\u0627\\u06CC\\u0646\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"paymentDate\",\"Caption\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Type\":\"datetime\",\"PlaceHolder\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0648 \\u0632\\u0645\\u0627\\u0646 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Help\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0627\\u0646\\u062C\\u0627\\u0645 \\u067E\\u0631\\u062F\\u0627\\u062E\\u062A\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null}]", true, "پرداخت‌ها", null, null },
                    { 10, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplier\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"discountTitle\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"discountAmount\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0631\\u0635\\u062F\\u06CC\",\"Accessor\":\"discountIsPercent\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "productOfferDiscounts", "ProductOfferDiscounts", "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#000\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2l3 7H9l3-7zM12 22a10 10 0 100-20 10 10 0 000 20z\"/></svg>", "productOfferDiscounts", "[{\"Name\":\"productId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0628\\u0631\\u0627\\u06CC \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"productOfferId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\" \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/productOffers/selectOption\",\"fetchFilters\":[\"productId\"]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"discountId\",\"Caption\":\"\\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0628\\u0631\\u0627\\u06CC \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/discounts/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تخفیف سفارشات", null, null },
                    { 11, "[\"active\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImageUrl\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0627\\u0635\\u0644\\u06CC\",\"Accessor\":\"isMain\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "productImages", "ProductImage", "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#000\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM3 9l4 4 3-3 5 5 4-4\"/></svg>", "productImages", "[{\"Name\":\"productId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0628\\u0631\\u0627\\u06CC \\u06A9\\u062F\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"Images\",\"Caption\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631\",\"Type\":\"fileArray\",\"PlaceHolder\":\"\\u0622\\u062F\\u0631\\u0633 \\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0622\\u067E\\u0644\\u0648\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"IsMainImages\",\"Caption\":\"\",\"Type\":\"hidden\",\"PlaceHolder\":\"\",\"Help\":\"\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null}]", true, "تصاویر محصول", null, null },
                    { 12, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplierName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplierImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u062A\\u0646 \\u062A\\u06AF\",\"Accessor\":\"tagName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "productOfferTags", "Product offer tag", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 7h10M7 12h10M7 17h10\"/></svg>", "productOfferTags", "[{\"Name\":\"productId\",\"Caption\":\"\\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"productOfferId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062A\\u06AF \\u0645\\u0631\\u0628\\u0648\\u0637 \\u0628\\u0647 \\u06A9\\u062F\\u0627\\u0645 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/productOffers/selectOption\",\"fetchFilters\":[\"productId\"]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"tagId\",\"Caption\":\"\\u062A\\u06AF\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062A\\u06AF \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u06A9\\u062F\\u0627\\u0645 \\u062A\\u06AF \\u0631\\u0627 \\u0628\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0645\\u06CC\\u200C\\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/tags/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u06AF \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تگ‌های سفارش", null, null },
                    { 13, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF\",\"Accessor\":\"tagName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0645\\u0642\\u0627\\u0644\\u0647\",\"Accessor\":\"blogTitleFa\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC \\u0645\\u0642\\u0627\\u0644\\u0647\",\"Accessor\":\"blogTitleEn\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "blogTags", "Blog tag", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 7h10M7 12h10M7 17h10\"/></svg>", "blogTags", "[{\"Name\":\"blogId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0645\\u0642\\u0627\\u0644\\u0647\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0645\\u0642\\u0627\\u0644\\u0647 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0628\\u0647 \\u0686\\u0647 \\u0645\\u0642\\u0627\\u0644\\u0647 \\u0627\\u06CC \\u062A\\u06AF \\u0648\\u0627\\u0631\\u062F \\u0634\\u0648\\u062F \\u061F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Blogs/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u0642\\u0627\\u0644\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"tagId\",\"Caption\":\"\\u062A\\u06AF\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062A\\u06AF \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u06A9\\u062F\\u0627\\u0645 \\u062A\\u06AF \\u0631\\u0627 \\u0628\\u0647 \\u0645\\u0642\\u0627\\u0644\\u0647 \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0645\\u06CC\\u200C\\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/tags/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u06AF \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تگ‌های بلاگ", null, null },
                    { 14, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u06AF\",\"Accessor\":\"tagName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0634\\u062E\\u0635\",\"Accessor\":\"userName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "userTags", "User tags", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 7h10M7 12h10M7 17h10\"/></svg>", "userTags", "[{\"Name\":\"userId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0628\\u0647 \\u0686\\u0647 \\u06A9\\u0627\\u0631\\u0628\\u0631\\u06CC \\u062A\\u06AF \\u0648\\u0627\\u0631\\u062F \\u0634\\u0648\\u062F \\u061F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"tagId\",\"Caption\":\"\\u062A\\u06AF\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062A\\u06AF \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u06A9\\u062F\\u0627\\u0645 \\u062A\\u06AF \\u0631\\u0627 \\u0628\\u0647 \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0645\\u06CC\\u200C\\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/tags/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u06AF \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "تگ‌های اشخاص", null, null },
                    { 15, "[\"active\",\"edit\",\"delete\",\"approve\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Accessor\":\"userName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\" \\u0645\\u0648\\u0631\\u062F \\u0646\\u0638\\u0631\",\"Accessor\":\"targetTitle\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0638\\u0631 \\u0628\\u0647\",\"Accessor\":\"targetType\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u062D\\u062A\\u0648\\u0627\",\"Accessor\":\"content\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u0627\\u0628\\u0644 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Accessor\":\"isApproved\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0627\\u0634\\u0627\\u0631\\u0647 \\u0628\\u0647 \\u0646\\u0638\\u0631\",\"Accessor\":\"parentName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "comments", "comment", "<svg width=\"13\" height=\"13\" viewBox=\"0 0 13 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.49967 4.33337C5.30306 4.33337 4.33301 5.30342 4.33301 6.50004C4.33301 7.69666 5.30306 8.66671 6.49967 8.66671C7.69629 8.66671 8.66634 7.69666 8.66634 6.50004C8.66634 5.30342 7.69629 4.33337 6.49967 4.33337Z\" stroke=\"#B1B1B1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>", "comments", "[{\"Name\":\"userId\",\"Caption\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0645\\u062F \\u0646\\u0638\\u0631\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B:\\u0639\\u0644\\u06CC \\u0627\\u06CC\\u0646 \\u0646\\u0638\\u0631 \\u0631\\u0627 \\u062F\\u0627\\u062F\\u0647\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Users/selectOption\",\"fetchFilters\":[\"id\"]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"targetId\",\"Caption\":\"\\u0622\\u06CC\\u062F\\u06CC \\u0645\\u0648\\u0631\\u062F \\u0646\\u0638\\u0631\",\"Type\":\"select\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0627\\u0632 \\u062A\\u0627\\u06CC\\u067E x \\u0645\\u0646\\u0638\\u0648\\u0631 \\u0622\\u06CC\\u062F\\u06CC y \\u0647\\u0633\\u062A\",\"Help\":\"\\u0628\\u0627 \\u062A\\u0631\\u06A9\\u06CC\\u0628 \\u0622\\u06CC\\u062F\\u06CC \\u0648 \\u062A\\u0627\\u06CC\\u067E \\u0645\\u0634\\u062E\\u0635 \\u0645\\u06CC\\u06A9\\u0646\\u06CC\\u0645 \\u0627\\u0632 \\u06A9\\u062F\\u0648\\u0645 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0647 \\u06A9\\u062F\\u0648\\u0645 \\u0622\\u06CC\\u062F\\u06CC \\u062F\\u0627\\u0631\\u06CC\\u0645 \\u0627\\u0634\\u0627\\u0631\\u0647 \\u0645\\u06CC \\u06A9\\u0646\\u06CC\\u0645 \",\"Order\":0,\"FetchConfig\":null,\"Options\":[{\"Label\":\"Blog\",\"Value\":1},{\"Label\":\"Product\",\"Value\":2},{\"Label\":\"Supplier\",\"Value\":3}],\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0622\\u06CC\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"targetType\",\"Caption\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0645\\u0648\\u0631\\u062F \\u0646\\u0638\\u0631\",\"Type\":\"select\",\"PlaceHolder\":\"\\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":[{\"Label\":\"Blog\",\"Value\":1},{\"Label\":\"Product\",\"Value\":2},{\"Label\":\"Supplier\",\"Value\":3}],\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062F\\u0633\\u062A\\u0647 \\u0628\\u0646\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"content\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0646\\u0638\\u0631 \\u0631\\u0627 \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F...\",\"Help\":\"\\u0646\\u0638\\u0631 \\u0631\\u0627 \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F...\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"50\",\"Message\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0628\\u0627\\u06CC\\u062F \\u062D\\u062F\\u0627\\u0642\\u0644 \\u06F5\\u06F0 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u0628\\u0627\\u0634\\u062F\"}]},{\"Name\":\"isApproved\",\"Caption\":\"\\u0642\\u0627\\u0628\\u0644 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Type\":\"bool\",\"PlaceHolder\":\"\\u0642\\u0627\\u0628\\u0644 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Help\":\"\\u0642\\u0627\\u0628\\u0644 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"parentId\",\"Caption\":\"\\u0631\\u06CC\\u067E\\u0644\\u0627\\u06CC \\u0628\\u0647\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u062A\\u06AF \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u06A9\\u062F\\u0627\\u0645 \\u062A\\u06AF \\u0631\\u0627 \\u0628\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0645\\u06CC\\u200C\\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u06AF \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "نظرات", null, null },
                    { 16, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplierName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplierImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0647\",\"Accessor\":\"basePrice\",\"Type\":\"price\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u0646\\u0647\\u0627\\u06CC\\u06CC\",\"Accessor\":\"finalPrice\",\"Type\":\"price\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC\",\"Accessor\":\"inventory\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0627\\u06CC\\u062C\\u0627\\u062F\",\"Accessor\":\"createdAt\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "productOffers", "Product offers", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n</svg>\r\n", "productOffers", "[{\"Name\":\"productId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646 \\u0633\\u0627\\u0645\\u0633\\u0648\\u0646\\u06AF 55 \\u0627\\u06CC\\u0646\\u0686\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"basePrice\",\"Caption\":\"\\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0647\",\"Type\":\"price\",\"PlaceHolder\":\"\\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0642\\u06CC\\u0645\\u062A \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0628\\u0646\\u0648\\u06CC\\u0633\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"inventory\",\"Caption\":\"\\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC\",\"Type\":\"number\",\"PlaceHolder\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0645\\u062D\\u0635\\u0648\\u0644 \\u062F\\u0631 \\u0627\\u0646\\u0628\\u0627\\u0631\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"min\",\"Condition\":\"0\",\"Message\":\"\\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC \\u0646\\u0645\\u06CC\\u200C\\u062A\\u0648\\u0627\\u0646\\u062F \\u0645\\u0646\\u0641\\u06CC \\u0628\\u0627\\u0634\\u062F\"}]}]", true, "سفارش فروش", null, null },
                    { 17, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"code\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Accessor\":\"amount\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0631\\u0635\\u062F\\u06CC\",\"Accessor\":\"isPercent\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639\",\"Accessor\":\"startDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646\",\"Accessor\":\"endDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0622\\u06CC\\u062F\\u06CC \\u0645\\u0627\\u0644\\u06A9\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u062D\\u062F\\u0648\\u062F\\u06CC\\u062A \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647\",\"Accessor\":\"usageLimit\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647\",\"Accessor\":\"usedCount\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0627\\u0631\\u0627\\u06CC \\u0627\\u0639\\u062A\\u0628\\u0627\\u0631\",\"Accessor\":\"isValid\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "discountCodes", "Promotions", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n</svg>\r\n", "discountCodes", "[{\"Name\":\"code\",\"Caption\":\"\\u0645\\u062A\\u0646 \\u06A9\\u062F\",\"Type\":\"text\",\"PlaceHolder\":\" \\u0645\\u062A\\u0646 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\" \\u0647\\u0631 \\u0645\\u062A\\u0646 \\u062F\\u0644\\u062E\\u0648\\u0627\\u0647\\u06CC \\u0645\\u06CC \\u062A\\u0648\\u0627\\u0646 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0631\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u0645\\u062A\\u0646 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"amount\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Type\":\"number\",\"PlaceHolder\":\" \\u0645\\u0642\\u062F\\u0627\\u0631 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u0645\\u0642\\u062F\\u0627\\u0631 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"isPercent\",\"Caption\":\" \\u0646\\u0648\\u0639 \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u062F\\u0631\\u0635\\u062F\\u06CC\\u061F\",\"Type\":\"checkbox\",\"PlaceHolder\":\"\\u0639\\u062F\\u062F \\u0648\\u0627\\u0631\\u062F \\u0634\\u062F\\u0647 \\u0628\\u0647 \\u062F\\u0631\\u0635\\u062F \\u0627\\u0632 \\u0645\\u0628\\u0644\\u063A \\u06A9\\u0645 \\u0634\\u0648\\u062F \\u06CC\\u0627 \\u062E\\u06CC\\u0631\",\"Help\":\"\\u0639\\u062F\\u062F \\u0648\\u0627\\u0631\\u062F \\u0634\\u062F\\u0647 \\u0628\\u0647 \\u062F\\u0631\\u0635\\u062F \\u0627\\u0632 \\u0645\\u0628\\u0644\\u063A \\u06A9\\u0645 \\u0634\\u0648\\u062F \\u06CC\\u0627 \\u062E\\u06CC\\u0631\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"startDate\",\"Caption\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \",\"Type\":\"date\",\"PlaceHolder\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \\u0627\\u0639\\u062A\\u0628\\u0627\\u0631 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Help\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \\u0627\\u0639\\u062A\\u0628\\u0627\\u0631 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"endDate\",\"Caption\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646\",\"Type\":\"date\",\"PlaceHolder\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u0627\\u0639\\u062A\\u0628\\u0627\\u0631 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Help\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u0627\\u0639\\u062A\\u0628\\u0627\\u0631 \\u06A9\\u062F \\u062A\\u062E\\u0641\\u06CC\\u0641\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"usageLimit\",\"Caption\":\"\\u0645\\u062D\\u062F\\u0648\\u062F\\u06CC\\u062A \",\"Type\":\"number\",\"PlaceHolder\":\"\\u0645\\u062D\\u062F\\u0648\\u062F\\u06CC\\u062A \\u062A\\u0639\\u062F\\u0627\\u062F \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647 \\u0627\\u0632 \\u06A9\\u062F\",\"Help\":\"\\u0645\\u062D\\u062F\\u0648\\u062F\\u06CC\\u062A \\u062A\\u0639\\u062F\\u0627\\u062F \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647 \\u0627\\u0632 \\u06A9\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"userId\",\"Caption\":\"\\u0622\\u06CC\\u062F\\u06CC \\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0622\\u06CC\\u062F\\u06CC \\u06A9\\u0627\\u0631\\u0628\\u0631\\u06CC \\u06A9\\u0647 \\u0645\\u06CC \\u062A\\u0648\\u0627\\u0646\\u062F \\u0627\\u0632 \\u0627\\u06CC\\u0646 \\u06A9\\u062F \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647 \\u06A9\\u0646\\u062F\",\"Help\":\"\\u0622\\u06CC\\u062F\\u06CC \\u06A9\\u0627\\u0631\\u0628\\u0631\\u06CC \\u06A9\\u0647 \\u0645\\u06CC \\u062A\\u0648\\u0627\\u0646\\u062F \\u0627\\u0632 \\u0627\\u06CC\\u0646 \\u06A9\\u062F \\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647 \\u06A9\\u0646\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]}]", true, "کد تخفیف", null, null },
                    { 18, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062F\\u0631\\u06AF\\u0627\\u0647\",\"Accessor\":\"title\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0622\\u0646\\u0644\\u0627\\u06CC\\u0646\",\"Accessor\":\"isOnline\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u0627\\u0646\\u0641\\u06CC\\u06AF\",\"Accessor\":\"configJson\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0631\\u062A\\u06CC\\u0628 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Accessor\":\"displayOrder\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "paymentMethods", "Payment method", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n</svg>\r\n", "paymentMethods", "[{\"Name\":\"title\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u062F\\u0631\\u06AF\\u0627\\u0647\",\"Type\":\"text\",\"PlaceHolder\":\" \\u0646\\u0627\\u0645 \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\" \\u0646\\u0627\\u0645 \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u0646\\u0627\\u0645 \\u062F\\u0631\\u06AF\\u0627\\u0647  \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"code\",\"Caption\":\"\\u06A9\\u062F \\u062F\\u0631\\u06AF\\u0627\\u0647\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u062F \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u06A9\\u062F \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u06A9\\u062F \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"isOnline\",\"Caption\":\"\\u0641\\u0639\\u0627\\u0644 \",\"Type\":\"checkbox\",\"PlaceHolder\":\"\\u0622\\u06CC\\u0627 \\u0627\\u06CC\\u0646 \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u06A9\\u0627\\u0631 \\u0645\\u06CC\\u06A9\\u0646\\u062F\\u061F\",\"Help\":\"\\u0622\\u06CC\\u0627 \\u0627\\u06CC\\u0646 \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u06A9\\u0627\\u0631 \\u0645\\u06CC\\u06A9\\u0646\\u062F\\u061F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"configJson\",\"Caption\":\"\\u06A9\\u0627\\u0646\\u0641\\u06CC\\u06AF \",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u062F \\u062C\\u06CC\\u0633\\u0648\\u0646 \\u0645\\u0631\\u0628\\u0648\\u0637 \\u0628\\u0647 \\u06A9\\u0627\\u0646\\u06A9\\u0634\\u0646 \\u062F\\u0631\\u06AF\\u0627\\u0647\",\"Help\":\"\\u06A9\\u062F \\u062C\\u06CC\\u0633\\u0648\\u0646 \\u0645\\u0631\\u0628\\u0648\\u0637 \\u0628\\u0647 \\u06A9\\u0627\\u0646\\u06A9\\u0634\\u0646 \\u062F\\u0631\\u06AF\\u0627\\u0647\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u06A9\\u062F \\u062C\\u06CC\\u0633\\u0648\\u0646 \\u0645\\u0631\\u0628\\u0648\\u0637 \\u0628\\u0647 \\u06A9\\u0627\\u0646\\u06A9\\u0634\\u0646 \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"displayOrder\",\"Caption\":\"\\u062A\\u0631\\u062A\\u06CC\\u0628\",\"Type\":\"number\",\"PlaceHolder\":\"\\u062A\\u0631\\u062A\\u06CC\\u0628 \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u0631\\u0627 \\u0645\\u0634\\u062E\\u0635 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0627\\u0648\\u0644\\u0648\\u06CC\\u062A \\u062F\\u0631\\u06AF\\u0627\\u0647 \\u0631\\u0627 \\u062A\\u063A\\u06CC\\u06CC\\u0631 \\u062F\\u0647\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]}]", true, "نوع پرداخت", null, null },
                    { 19, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"supplierName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u0634\\u0631\\u0648\\u0639\",\"Accessor\":\"startDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0631\\u06CC\\u062E \\u067E\\u0627\\u06CC\\u0627\\u0646\",\"Accessor\":\"endDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0631\\u062A\\u06CC\\u0628 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Accessor\":\"displayOrder\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "specialOffers", "Special offers", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n                </svg>\r\n                ", "specialOffers", "[{\"Name\":\"productId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646 \\u0633\\u0627\\u0645\\u0633\\u0648\\u0646\\u06AF 55 \\u0627\\u06CC\\u0646\\u0686\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"productOfferId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\" \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/productOffers/selectOption\",\"fetchFilters\":[\"productId\"]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u067E\\u06CC\\u0634\\u0646\\u0647\\u0627\\u062F \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"discountId\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u062E\\u0641\\u06CC\\u0641 \",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627 :\\u06CC\\u0644\\u062F\\u0627\",\"Help\":\"\\u062A\\u062E\\u0641\\u06CC\\u0641 \\u062E\\u0627\\u0635\\u06CC \\u06A9\\u0647 \\u0645\\u06CC \\u062E\\u0648\\u0627\\u0647\\u06CC\\u062F \\u0628\\u0631 \\u0631\\u0648\\u06CC \\u0633\\u0641\\u0627\\u0631\\u0634 \\u0634\\u0645\\u0627 \\u0627\\u0639\\u0645\\u0627\\u0644 \\u0628\\u0634\\u0647 \\u0631\\u0648 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/discounts/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\" \\u062A\\u062E\\u0641\\u06CC\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"startDate\",\"Caption\":\"\\u0632\\u0645\\u0627\\u0646 \\u0634\\u0631\\u0648\\u0639\",\"Type\":\"date\",\"PlaceHolder\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u0627\\u0631\\u06CC\\u062E\",\"Help\":\"\\u0632\\u0645\\u0627\\u0646 \\u0634\\u0631\\u0648\\u0639 \\u067E\\u06CC\\u0634\\u0646\\u0647\\u0627\\u062F \\u0648\\u06CC\\u0698\\u0647\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0632\\u0645\\u0627\\u0646 \\u0634\\u0631\\u0648\\u0639 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"endDate\",\"Caption\":\"\\u0632\\u0645\\u0627\\u0646 \\u067E\\u0627\\u06CC\\u0627\\u0646\",\"Type\":\"date\",\"PlaceHolder\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062A\\u0627\\u0631\\u06CC\\u062E\",\"Help\":\"\\u0632\\u0645\\u0627\\u0646 \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u067E\\u06CC\\u0634\\u0646\\u0647\\u0627\\u062F \\u0648\\u06CC\\u0698\\u0647\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0632\\u0645\\u0627\\u0646 \\u067E\\u0627\\u06CC\\u0627\\u0646 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"displayOrder\",\"Caption\":\"\\u062A\\u0631\\u062A\\u06CC\\u0628 \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0627\\u0648\\u0644\\u0648\\u06CC\\u062A \\u0646\\u0645\\u0627\\u06CC\\u0634\",\"Help\":\"\\u062F\\u0631 \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0635\\u0644\\u06CC \\u0628\\u0647 \\u062A\\u0631\\u062A\\u06CC\\u0628 \\u0627\\u06CC\\u0646 \\u0627\\u0648\\u0644\\u0648\\u06CC\\u062A \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0627\\u062F\\u0647 \\u0645\\u06CC\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]}]", true, "پیشنهاد ویژه", null, null },
                    { 20, "[\"active\",\"edit\",\"delete\",\"new\",\"default\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633\",\"Accessor\":\"banner\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0646\\u0631\",\"Accessor\":\"bannerTitle\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D \\u0628\\u0646\\u0631\",\"Accessor\":\"bannerDescription\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0622\\u062F\\u0631\\u0633 \\u0627\\u0648\\u0644\",\"Accessor\":\"firstUrl\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0622\\u062F\\u0631\\u0633 \\u062F\\u0648\\u0645\",\"Accessor\":\"secondUrl\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0645\\u0627\\u06CC\\u0634 \\u0628\\u0646\\u0631\",\"Accessor\":\"isHero\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "landing", "landing slide", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n                </svg>\r\n                ", "landing", "[{\"Name\":\"bannerUrl\",\"Caption\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0628\\u0646\\u0631\",\"Type\":\"file\",\"PlaceHolder\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0628\\u0646\\u0631\",\"Help\":\"\\u0639\\u06A9\\u0633\\u06CC \\u06A9\\u0647 \\u0627\\u0646\\u062A\\u0638\\u0627\\u0631 \\u0645\\u06CC \\u0631\\u0648\\u062F \\u062F\\u0631 \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0635\\u0644\\u06CC \\u062F\\u06CC\\u062F\\u0647 \\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0639\\u06A9\\u0633 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"bannerTitle\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0646\\u0631\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0646\\u0631\",\"Help\":\"\\u062F\\u0631 \\u0628\\u0646\\u0631 \\u0686\\u0647 \\u0639\\u0646\\u0648\\u0627\\u0646\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0627\\u062F\\u0647 \\u0634\\u0648\\u062F \\u061F \\u061F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0646\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"bannerDescription\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D \\u0628\\u0646\\u0631\",\"Type\":\"text\",\"PlaceHolder\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0628\\u0646\\u0631\",\"Help\":\"\\u062F\\u0631 \\u0628\\u0646\\u0631 \\u0686\\u0647 \\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0627\\u062F\\u0647 \\u0634\\u0648\\u062F \\u061F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0628\\u0646\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"firstUrl\",\"Caption\":\"\\u0622\\u062F\\u0631\\u0633 \\u0627\\u0648\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0622\\u062F\\u0631\\u0633 \\u0627\\u0648\\u0644\",\"Help\":\"\\u0628\\u0627 \\u06A9\\u0644\\u06CC\\u06A9 \\u0628\\u0631 \\u0631\\u0648\\u06CC \\u0639\\u06A9\\u0633 \\u0628\\u0647 \\u0686\\u0647 \\u0622\\u062F\\u0631\\u0633\\u06CC \\u0628\\u0631\\u0648\\u062F \\u061F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0622\\u062F\\u0631\\u0633   \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"secondUrl\",\"Caption\":\"\\u0622\\u062F\\u0631\\u0633 \\u062F\\u0648\\u0645\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0622\\u062F\\u0631\\u0633 \\u0635\\u0641\\u062D\\u0647 \\u062F\\u0648\\u0645\",\"Help\":\"\\u0628\\u0627 \\u06A9\\u0644\\u06CC\\u06A9 \\u0628\\u0631 \\u0631\\u0648\\u06CC \\u0639\\u06A9\\u0633 \\u0628\\u0647 \\u0686\\u0647 \\u0622\\u062F\\u0631\\u0633\\u06CC \\u0628\\u0631\\u0648\\u062F \\u061F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0622\\u062F\\u0631\\u0633 \\u0635\\u0641\\u062D\\u0647 \\u062F\\u0648\\u0645 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "اسلاید صفحه اصلی", null, null },
                    { 21, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Accessor\":\"userName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0648\\u0639\",\"Accessor\":\"targetType\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0647\\u062F\\u0641\",\"Accessor\":\"targetId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632\",\"Accessor\":\"rateValue\",\"Type\":\"rate\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "rates", "Rates", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n                </svg>\r\n                ", "rates", "[{\"Name\":\"userId\",\"Caption\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0645\\u062F \\u0646\\u0638\\u0631\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B:\\u0639\\u0644\\u06CC \\u0627\\u06CC\\u0646 \\u0646\\u0638\\u0631 \\u0631\\u0627 \\u062F\\u0627\\u062F\\u0647\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"targetType\",\"Caption\":\"\\u062F\\u0633\\u062A\\u0647\\u200C\\u0628\\u0646\\u062F\\u06CC \\u0645\\u0648\\u0631\\u062F \\u0646\\u0638\\u0631\",\"Type\":\"select\",\"PlaceHolder\":\"\\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062F\\u0633\\u062A\\u0647 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":[{\"Label\":\"Blog\",\"Value\":1},{\"Label\":\"Product\",\"Value\":2},{\"Label\":\"Supplier\",\"Value\":3}],\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u062F\\u0633\\u062A\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"targetId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0647\\u062F\\u0641\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0634\\u0646\\u0627\\u0633\\u0647 \\u0647\\u062F\\u0641\",\"Help\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u06CC\\u0627 \\u0645\\u0642\\u0627\\u0644\\u0647 \\u06CC\\u0627 \\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0647\\u062F\\u0641 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"value\",\"Caption\":\"\\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0627\\u0632 \\u06CC\\u06A9 \\u062A\\u0627 \\u067E\\u0646\\u062C \\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632 \\u0628\\u062F\\u06CC\\u062F\",\"Help\":\"\\u0627\\u0632 \\u06CC\\u06A9 \\u06A9\\u0647 \\u067E\\u0627\\u06CC\\u06CC\\u0646\\u062A\\u0631\\u06CC\\u0646 \\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632 \\u0627\\u0633\\u062A \\u062A\\u0627 5 \\u0628\\u0627\\u0644\\u0627 \\u062A\\u0631\\u06CC\\u0646 \\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0645\\u062A\\u06CC\\u0627\\u0632 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "امتیاز دهی", null, null },
                    { 22, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645\",\"Accessor\":\"title\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A\",\"Accessor\":\"description\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A\",\"Accessor\":\"price\",\"Type\":\"price\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0632\\u0645\\u0627\\u0646 \\u062A\\u062D\\u0648\\u06CC\\u0644/\\u0633\\u0627\\u0639\\u062A\",\"Accessor\":\"estimatedDeliveryTime\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u067E\\u06CC\\u0634 \\u0641\\u0631\\u0636\",\"Accessor\":\"isDefault\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "shippingMethods", "Shipping methods", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n                </svg>\r\n                ", "shippingMethods", "[{\"Name\":\"title\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0646\\u062D\\u0648\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627 :\\u067E\\u06CC\\u06A9\",\"Help\":\"\\u0646\\u062D\\u0648\\u0647 \\u06CC \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0645\\u0631\\u0633\\u0648\\u0644\\u0647 \\u0631\\u0627 \\u0645\\u0634\\u062E\\u0635 \\u0645\\u06CC \\u06A9\\u0646\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0646\\u062D\\u0648\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"description\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627 :\\u0627\\u0633\\u062A\\u0641\\u0627\\u062F\\u0647 \\u0627\\u0632 \\u0628\\u0627\\u0631\\u0628\\u0631\\u06CC \\u062A\\u0647\\u0631\\u0627\\u0646\",\"Help\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D \\u06A9\\u0648\\u062A\\u0627\\u0647\\u06CC \\u062F\\u0631 \\u0645\\u0648\\u0631\\u062F \\u0646\\u062D\\u0648\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0628\\u062F\\u0647\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]},{\"Name\":\"price\",\"Caption\":\"\\u0647\\u0632\\u06CC\\u0646\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644\",\"Type\":\"price\",\"PlaceHolder\":\"200,000 \\u062A\\u0648\\u0645\\u0627\\u0646\",\"Help\":\"\\u0647\\u0632\\u06CC\\u0646\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0645\\u0633\\u062A\\u0642\\u06CC\\u0645 \\u0628\\u0647 \\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0627\\u0646\\u06CC \\u0641\\u0627\\u06A9\\u062A\\u0648\\u0631 \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0645\\u06CC \\u06AF\\u0631\\u062F\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0647\\u0632\\u06CC\\u0646\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"estimatedDeliveryTime\",\"Caption\":\"\\u062A\\u062E\\u0645\\u06CC\\u0646 \\u0641\\u0627\\u0635\\u0644\\u0647 \\u0632\\u0645\\u0627\\u0646\\u06CC\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627:4\",\"Help\":\"\\u0645\\u0641\\u0647\\u0648\\u0645 \\u0645\\u06CC \\u062A\\u0648\\u0627\\u0646\\u062F \\u0628\\u0647 \\u0631\\u0648\\u0632 \\u06CC\\u0627 \\u0633\\u0627\\u0639\\u062A \\u0628\\u0627\\u0634\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0632\\u0645\\u0627\\u0646 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"isDefault\",\"Caption\":\"\\u067E\\u06CC\\u0634 \\u0641\\u0631\\u0636\",\"Type\":\"checkbox\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627:4\",\"Help\":\"\\u0627\\u06AF\\u0631 \\u06A9\\u0627\\u0631\\u0628\\u0631 \\u0646\\u062D\\u0648\\u0647 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0646\\u06A9\\u0646\\u062F \\u0627\\u06CC\\u0646 \\u0646\\u0648\\u0639 \\u0627\\u0631\\u0633\\u0627\\u0644 \\u067E\\u06CC\\u0634 \\u0641\\u0631\\u0636 \\u0642\\u0631\\u0627\\u0631 \\u06AF\\u06CC\\u0631\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[]}]", true, "نحوه ارسال", null, null },
                    { 23, "[\"active\",\"edit\",\"delete\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0633\\u0628\\u062F \\u062E\\u0631\\u06CC\\u062F\",\"Accessor\":\"cartId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u06A9\\u0627\\u0631\\u0628\\u0631\",\"Accessor\":\"userName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u067E\\u0627\\u06CC\\u0647\",\"Accessor\":\"basePrice\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u06A9\\u0644\",\"Accessor\":\"finalPrice\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0639\\u062F\\u0627\\u062F\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "cartItems", "CartItem", "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#000\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM7 3v18\"/></svg>", "cartItems", "[{\"Name\":\"productId\",\"Caption\":\"\\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062D\\u0635\\u0648\\u0644\\u06CC \\u06A9\\u0647 \\u0628\\u0647 \\u0633\\u0628\\u062F \\u0627\\u0636\\u0627\\u0641\\u0647 \\u0634\\u062F\\u0647 \\u0627\\u0633\\u062A\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"productOfferId\",\"Caption\":\"\\u0633\\u0641\\u0627\\u0631\\u0634 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\"\\u0633\\u0641\\u0627\\u0631\\u0634 \\u0641\\u0631\\u0648\\u0634 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u0633\\u0641\\u0627\\u0631\\u0634\\u06CC \\u06A9\\u0647 \\u0627\\u0632 \\u0627\\u06CC\\u0646 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u06AF\\u0630\\u0627\\u0634\\u062A\\u0647 \\u0634\\u062F\\u0647\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/productOffers/selectOption\",\"fetchFilters\":[\"productId\"]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0633\\u0641\\u0627\\u0631\\u0634 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"quantity\",\"Caption\":\"\\u062A\\u0639\\u062F\\u0627\\u062F\",\"Type\":\"number\",\"PlaceHolder\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0648\\u0627\\u062D\\u062F\\u0647\\u0627\\u06CC \\u0627\\u06CC\\u0646 \\u0645\\u062D\\u0635\\u0648\\u0644 \\u062F\\u0631 \\u0633\\u0628\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"},{\"Rule\":\"min\",\"Condition\":\"1\",\"Message\":\"\\u062A\\u0639\\u062F\\u0627\\u062F \\u0628\\u0627\\u06CC\\u062F \\u062D\\u062F\\u0627\\u0642\\u0644 1 \\u0628\\u0627\\u0634\\u062F\"}]}]", true, "آیتم‌های سبد خرید", null, null },
                    { 24, "[]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0639\\u06A9\\u0633 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Accessor\":\"productImage\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0627\\u0645\\u06CC\\u0646 \\u06A9\\u0646\\u0646\\u062F\\u0647\",\"Accessor\":\"productOfferUser\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u062A\\u0639\\u062F\\u0627\\u062F\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u0648\\u0627\\u062D\\u062F\",\"Accessor\":\"unitPrice\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0642\\u06CC\\u0645\\u062A \\u0646\\u0647\\u0627\\u06CC\\u06CC\",\"Accessor\":\"totalPrice\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0627\\u0644\\u06A9 \\u0633\\u0641\\u0627\\u0631\\u0634\",\"Accessor\":\"user\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A\",\"Accessor\":\"orderStatus\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "orderitems", "OrderItem", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9\" /></svg>", "orderItems", "[]", true, "آیتم‌های سفارش", null, null },
                    { 25, "[]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0646\\u0642\\u0634\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "roles", "Role", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z\" /></svg>", "roles", "[]", true, "نقش‌ها", null, null },
                    { 26, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC\\u062A\",\"Accessor\":\"entityName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Accessor\":\"persianDisplayName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Accessor\":\"englishDisplayName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u067E\\u0627\\u06CC\\u0627\\u0646\\u0647/Api\",\"Accessor\":\"endPoint\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "entityConfigs", "Page configs", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z\" />\r\n</svg>\r\n", "entityConfigs", "[{\"Name\":\"entityName\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0645\\u0648\\u062C\\u0648\\u062F\\u06CC\\u062A \\u0635\\u0641\\u062D\\u0647\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627 :comments\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0648\\u0627\\u06A9\\u0634\\u06CC \\u06A9\\u0627\\u0646\\u0641\\u06CC\\u06AF \\u0635\\u0641\\u062D\\u0647 \\u0628\\u0647 \\u06A9\\u0627\\u0631 \\u0645\\u06CC \\u0631\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0646\\u0641\\u06CC\\u06AF \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"persianDisplayName\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0635\\u0641\\u062D\\u0647\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627 :\\u0646\\u0638\\u0631\\u0627\\u062A\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u0646\\u0627\\u0645 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0635\\u0641\\u062D\\u0647 \\u062F\\u0631 \\u0628\\u0627\\u0644\\u0627\\u06CC \\u0635\\u0641\\u062D\\u0647 \\u0628\\u0647 \\u06A9\\u0627\\u0631 \\u0645\\u06CC \\u0631\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0635\\u0641\\u062D\\u0647 \\u0628\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"englishDisplayName\",\"Caption\":\"\\u0646\\u0627\\u0645 \\u0635\\u0641\\u062D\\u0647 \\u0628\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0628\\u0631\\u0627\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0631 \\u0628\\u0627\\u0644\\u0627\\u06CC \\u0635\\u0641\\u062D\\u0647\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0646\\u0645\\u0627\\u06CC\\u0634 \\u062F\\u0631 \\u0628\\u0627\\u0644\\u0627\\u06CC \\u0635\\u0641\\u062D\\u0647\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0635\\u0641\\u062D\\u0647 \\u0628\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"endPoint\",\"Caption\":\"\\u067E\\u0627\\u06CC\\u0627\\u0646\\u0647 \\u0627\\u0631\\u062A\\u0628\\u0627\\u0637\\u06CC/Api\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627:blogs\",\"Help\":\"\\u0646\\u0627\\u0645 \\u0648\\u0627\\u062D\\u062F \\u0627\\u0631\\u062A\\u0628\\u0627\\u0637\\u06CC \\u062F\\u0631 api \\u0647\\u0627\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u067E\\u0627\\u06CC\\u0627\\u0646\\u0647/Api \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "کانفیگ صفحات", null, null },
                    { 27, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0646\\u0627\\u0645 \\u06A9\\u0627\\u0644\\u0627\",\"Accessor\":\"productName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0634\\u062E\\u0635\\u0647\",\"Accessor\":\"key\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0642\\u062F\\u0627\\u0631\",\"Accessor\":\"value\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "specifications", "Product specifications", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\r\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9\" /></svg>", "specifications", "[{\"Name\":\"productId\",\"Caption\":\"\\u0634\\u0646\\u0627\\u0633\\u0647 \\u06A9\\u0627\\u0644\\u0627\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":\" \\u0645\\u062D\\u0635\\u0648\\u0644 \\u0631\\u0627 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u062A\\u0644\\u0648\\u06CC\\u0632\\u06CC\\u0648\\u0646 \\u0633\\u0627\\u0645\\u0633\\u0648\\u0646\\u06AF 55 \\u0627\\u06CC\\u0646\\u0686\",\"Order\":0,\"FetchConfig\":{\"api\":\"api/Products/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0627\\u0644\\u0627 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"key\",\"Caption\":\"\\u0645\\u0634\\u062E\\u0635\\u0647 \\u06CC\\u0627 \\u0635\\u0641\\u062A \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u0634\\u062E\\u0635\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0635\\u0641\\u062A \\u06CC\\u0627 \\u06A9\\u0644\\u0645\\u0647 \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0645\\u0631\\u0628\\u0648\\u0637\\u0647\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0646\\u0627\\u0645 \\u0645\\u0634\\u062E\\u0635\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"value\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u0635\\u0641\\u062A\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u0645\\u0634\\u062E\\u0635\\u0647 \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u0635\\u0641\\u062A \\u0627\\u06CC\\u0646 \\u0645\\u062D\\u0635\\u0648\\u0644\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0642\\u062F\\u0627\\u0631 \\u0645\\u0634\\u062E\\u0635\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]}]", true, "مشخصات کالا", null, null }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "IsActive", "IsDeleted", "RoleName", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "SuperAdmin", null, null },
                    { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "Admin", null, null },
                    { 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "StoreManager", null, null },
                    { 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "Support", null, null },
                    { 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "ContentEditor", null, null },
                    { 6, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, true, false, "Customer", null, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_AuthorId",
                table: "Blogs",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_Slug",
                table: "Blogs",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BlogTags_BlogId_TagId",
                table: "BlogTags",
                columns: new[] { "BlogId", "TagId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BlogTags_TagId",
                table: "BlogTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId",
                table: "CartItems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_ProductId",
                table: "CartItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_ProductOfferId",
                table: "CartItems",
                column: "ProductOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryId",
                table: "Categories",
                column: "ParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ParentId",
                table: "Comments",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_TargetType_TargetId",
                table: "Comments",
                columns: new[] { "TargetType", "TargetId" });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityConfigs_EntityName",
                table: "EntityConfigs",
                column: "EntityName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductOfferId",
                table: "OrderItems",
                column: "ProductOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DiscountCodeId",
                table: "Orders",
                column: "DiscountCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentMethodId",
                table: "Orders",
                column: "PaymentMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ShippingAddressId",
                table: "Orders",
                column: "ShippingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ShippingMethodId",
                table: "Orders",
                column: "ShippingMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_OrderId",
                table: "Payment",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_PaymentMethodId",
                table: "Payment",
                column: "PaymentMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_ProductId",
                table: "ProductImages",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOfferDiscount_DiscountId",
                table: "ProductOfferDiscount",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOfferDiscount_ProductOfferId",
                table: "ProductOfferDiscount",
                column: "ProductOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOffers_ProductId",
                table: "ProductOffers",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOffers_SupplierId",
                table: "ProductOffers",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOfferTags_ProductOfferId",
                table: "ProductOfferTags",
                column: "ProductOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOfferTags_TagId",
                table: "ProductOfferTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecification_ProductId",
                table: "ProductSpecification",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Rates_UserId_TargetId_TargetType",
                table: "Rates",
                columns: new[] { "UserId", "TargetId", "TargetType" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialOffers_DiscountId",
                table: "SpecialOffers",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecialOffers_ProductOfferId",
                table: "SpecialOffers",
                column: "ProductOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTags_TagId",
                table: "UserTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTags_UserId_TagId",
                table: "UserTags",
                columns: new[] { "UserId", "TagId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogTags");

            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "EntityConfigs");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.DropTable(
                name: "ProductOfferDiscount");

            migrationBuilder.DropTable(
                name: "ProductOfferTags");

            migrationBuilder.DropTable(
                name: "ProductSpecification");

            migrationBuilder.DropTable(
                name: "Rates");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Slides");

            migrationBuilder.DropTable(
                name: "SpecialOffers");

            migrationBuilder.DropTable(
                name: "UserTags");

            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "ProductOffers");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "DiscountCode");

            migrationBuilder.DropTable(
                name: "PaymentMethod");

            migrationBuilder.DropTable(
                name: "ShippingMethods");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
