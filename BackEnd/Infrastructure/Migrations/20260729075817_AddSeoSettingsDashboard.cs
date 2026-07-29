using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSeoSettingsDashboard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SeoSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoutePath = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    MatchType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    TitleFa = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    TitleEn = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    DescriptionFa = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionEn = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    KeywordsFa = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    KeywordsEn = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CanonicalPath = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    OgImageUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    RobotsIndex = table.Column<bool>(type: "boolean", nullable: false),
                    RobotsFollow = table.Column<bool>(type: "boolean", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeoSettings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "EntityConfigs",
                columns: new[] { "Id", "ActionsJson", "ColumnsJson", "CreatedAt", "CreatedBy", "DeletedAt", "DeletedBy", "EndPoint", "EnglishDisplayName", "EntityIconBase64", "EntityName", "FormFieldsJson", "IsActive", "PersianDisplayName", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { 28, "[\"active\",\"edit\",\"delete\",\"new\"]", "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0645\\u0633\\u06CC\\u0631\",\"Accessor\":\"routePath\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u0646\\u0648\\u0639 \\u062A\\u0637\\u0628\\u06CC\\u0642\",\"Accessor\":\"matchType\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Accessor\":\"titleFa\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"Canonical\",\"Accessor\":\"canonicalPath\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"Priority\",\"Accessor\":\"priority\",\"Type\":\"number\",\"Sortable\":true,\"Filterable\":false,\"Options\":null}]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "seoSettings", "SEO Rules", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\" /></svg>", "seoSettings", "[{\"Name\":\"routePath\",\"Caption\":\"\\u0645\\u0633\\u06CC\\u0631 \\u0635\\u0641\\u062D\\u0647\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: products \\u06CC\\u0627 products/samsung-tv\",\"Help\":\"\\u0645\\u0633\\u06CC\\u0631 \\u0631\\u0627 \\u0628\\u062F\\u0648\\u0646 locale \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F. \\u0628\\u0631\\u0627\\u06CC \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0635\\u0644\\u06CC \\u062E\\u0627\\u0644\\u06CC \\u0628\\u06AF\\u0630\\u0627\\u0631\\u06CC\\u062F.\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0633\\u06CC\\u0631 \\u0635\\u0641\\u062D\\u0647 \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"matchType\",\"Caption\":\"\\u0646\\u0648\\u0639 \\u062A\\u0637\\u0628\\u06CC\\u0642\",\"Type\":\"text\",\"PlaceHolder\":\"exact \\u06CC\\u0627 prefix\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0647\\u0645\\u0627\\u0646 \\u0645\\u0633\\u06CC\\u0631 exact \\u0648 \\u0628\\u0631\\u0627\\u06CC \\u062A\\u0645\\u0627\\u0645 \\u0632\\u06CC\\u0631\\u0645\\u0633\\u06CC\\u0631\\u0647\\u0627 prefix \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"titleFa\",\"Caption\":\"SEO Title \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0633\\u0626\\u0648\\u06CC \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"titleEn\",\"Caption\":\"SEO Title \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"English SEO title\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"descriptionFa\",\"Caption\":\"Meta Description \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 \\u062D\\u062F\\u0648\\u062F 160 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"descriptionEn\",\"Caption\":\"Meta Description \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"About 160 characters\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"keywordsFa\",\"Caption\":\"Keywords \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0628\\u0627 \\u06A9\\u0627\\u0645\\u0627\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"keywordsEn\",\"Caption\":\"Keywords \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"keyword1, keyword2\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"canonicalPath\",\"Caption\":\"Canonical Path\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: products/samsung-tv\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"ogImageUrl\",\"Caption\":\"Open Graph Image\",\"Type\":\"text\",\"PlaceHolder\":\"/images/og/default.jpg\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"priority\",\"Caption\":\"Priority\",\"Type\":\"number\",\"PlaceHolder\":\"\\u0627\\u0639\\u062F\\u0627\\u062F \\u0628\\u0632\\u0631\\u06AF\\u200C\\u062A\\u0631 \\u0627\\u0648\\u0644\\u0648\\u06CC\\u062A \\u0628\\u0627\\u0644\\u0627\\u062A\\u0631 \\u062F\\u0627\\u0631\\u0646\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"robotsIndex\",\"Caption\":\"Index \\u0634\\u0648\\u062F\",\"Type\":\"checkbox\",\"PlaceHolder\":null,\"Help\":\"\\u0627\\u06AF\\u0631 \\u062E\\u0627\\u0645\\u0648\\u0634 \\u0628\\u0627\\u0634\\u062F\\u060C noindex \\u0627\\u0639\\u0645\\u0627\\u0644 \\u0645\\u06CC\\u200C\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"robotsFollow\",\"Caption\":\"Follow \\u0634\\u0648\\u062F\",\"Type\":\"checkbox\",\"PlaceHolder\":null,\"Help\":\"\\u0627\\u06AF\\u0631 \\u062E\\u0627\\u0645\\u0648\\u0634 \\u0628\\u0627\\u0634\\u062F\\u060C nofollow \\u0627\\u0639\\u0645\\u0627\\u0644 \\u0645\\u06CC\\u200C\\u0634\\u0648\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"notes\",\"Caption\":\"\\u06CC\\u0627\\u062F\\u062F\\u0627\\u0634\\u062A\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u06CC\\u0627\\u062F\\u062F\\u0627\\u0634\\u062A \\u062F\\u0627\\u062E\\u0644\\u06CC \\u0628\\u0631\\u0627\\u06CC \\u062A\\u06CC\\u0645 \\u0645\\u062D\\u062A\\u0648\\u0627/\\u0633\\u0626\\u0648\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null}]", true, "قوانین سئو", null, null },
                    { 29, "[]", "[]", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, null, "seo", "SEO Dashboard", "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12m-9 4.5 3.75-3.75M15 21l3.75-3.75M7.5 12h.008v.008H7.5V12Zm4.5-3h.008v.008H12V9Zm4.5-3h.008v.008H16.5V6Z\" /></svg>", "seo", "[]", true, "داشبورد سئو", null, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeoSettings_RoutePath_MatchType_IsDeleted",
                table: "SeoSettings",
                columns: new[] { "RoutePath", "MatchType", "IsDeleted" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeoSettings");

            migrationBuilder.DeleteData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 29);
        }
    }
}
