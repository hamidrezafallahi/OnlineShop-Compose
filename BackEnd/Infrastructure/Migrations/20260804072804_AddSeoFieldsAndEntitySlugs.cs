using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSeoFieldsAndEntitySlugs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Users",
                type: "character varying(220)",
                maxLength: 220,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Tags",
                type: "character varying(220)",
                maxLength: 220,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionEn",
                table: "Products",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionFa",
                table: "Products",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleEn",
                table: "Products",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleFa",
                table: "Products",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FaqJson",
                table: "Categories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionEn",
                table: "Categories",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionFa",
                table: "Categories",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleEn",
                table: "Categories",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleFa",
                table: "Categories",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Categories",
                type: "character varying(220)",
                maxLength: 220,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionEn",
                table: "Brands",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaDescriptionFa",
                table: "Brands",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleEn",
                table: "Brands",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitleFa",
                table: "Brands",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Brands",
                type: "character varying(220)",
                maxLength: 220,
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE "Users" SET "Slug" = 'user-' || "Id"::text WHERE "Slug" IS NULL OR btrim("Slug") = '';
                UPDATE "Tags" SET "Slug" = 'tag-' || "Id"::text WHERE "Slug" IS NULL OR btrim("Slug") = '';
                UPDATE "Categories" SET "Slug" = 'category-' || "Id"::text WHERE "Slug" IS NULL OR btrim("Slug") = '';
                UPDATE "Brands" SET "Slug" = 'brand-' || "Id"::text WHERE "Slug" IS NULL OR btrim("Slug") = '';
                """);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Users",
                type: "character varying(220)",
                maxLength: 220,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(220)",
                oldMaxLength: 220,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Tags",
                type: "character varying(220)",
                maxLength: 220,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(220)",
                oldMaxLength: 220,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Categories",
                type: "character varying(220)",
                maxLength: 220,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(220)",
                oldMaxLength: 220,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Brands",
                type: "character varying(220)",
                maxLength: 220,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(220)",
                oldMaxLength: 220,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 1,
                column: "FormFieldsJson",
                value: "[{\"Name\":\"titleFa\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0645\\u0639\\u0631\\u0641\\u06CC \\u0645\\u062D\\u0635\\u0648\\u0644 \\u062C\\u062F\\u06CC\\u062F\",\"Help\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"introFa\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F (HTML \\u0645\\u062C\\u0627\\u0632 \\u0627\\u0633\\u062A)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"contentFa\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0645\\u062A\\u0646 \\u0627\\u0635\\u0644\\u06CC \\u0628\\u0627 H2/H3\\u060C \\u062C\\u062F\\u0648\\u0644 \\u0648 FAQ (HTML)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionFa\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F (HTML \\u0645\\u062C\\u0627\\u0632 \\u0627\\u0633\\u062A)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptFa\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 \\u06F1\\u06F6\\u06F0 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u2014 \\u0628\\u0631\\u0627\\u06CC \\u06A9\\u0627\\u0631\\u062A \\u0628\\u0644\\u0627\\u06AF \\u0648 \\u0641\\u0627\\u0644\\u200C\\u0628\\u06A9 \\u0645\\u062A\\u0627\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionFa\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 \\u06F1\\u06F6\\u06F0 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631 \\u2014 \\u0627\\u062E\\u062A\\u0635\\u0627\\u0635\\u06CC \\u0628\\u0631\\u0627\\u06CC SERP\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsFa\",\"Caption\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0628\\u0627 \\u06A9\\u0627\\u0645\\u0627 \\u062C\\u062F\\u0627 \\u0634\\u0648\\u0646\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"titleEn\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"New Product Introduction\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"introEn\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Blog introduction (HTML allowed)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"contentEn\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Main body with H2/H3, table and FAQ (HTML)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionEn\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Blog conclusion (HTML allowed)\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptEn\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Short blog summary\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionEn\",\"Caption\":\"Meta Description\",\"Type\":\"text\",\"PlaceHolder\":\"Max 160 characters\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsEn\",\"Caption\":\"Meta Keywords\",\"Type\":\"text\",\"PlaceHolder\":\"keyword1, keyword2\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"slug\",\"Caption\":\"Slug\",\"Type\":\"text\",\"PlaceHolder\":\"new-product-introduction\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0622\\u062F\\u0631\\u0633 URL \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"Slug \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"thumbnailFile\",\"Caption\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Type\":\"file\",\"PlaceHolder\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"jpg, png (\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 2MB)\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"authorId\",\"Caption\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":null,\"Help\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647 \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":{\"api\":\"Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":null}]");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Slug",
                table: "Users",
                column: "Slug",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_Slug",
                table: "Tags",
                column: "Slug",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Slug",
                table: "Categories",
                column: "Slug",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Brands_Slug",
                table: "Brands",
                column: "Slug",
                unique: true,
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Slug",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Tags_Slug",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Categories_Slug",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Brands_Slug",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionEn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionFa",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeoTitleEn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeoTitleFa",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FaqJson",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionEn",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionFa",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "SeoTitleEn",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "SeoTitleFa",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionEn",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "MetaDescriptionFa",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "SeoTitleEn",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "SeoTitleFa",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Brands");

            migrationBuilder.UpdateData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 1,
                column: "FormFieldsJson",
                value: "[{\"Name\":\"titleFa\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u062B\\u0644\\u0627\\u064B: \\u0645\\u0639\\u0631\\u0641\\u06CC \\u0645\\u062D\\u0635\\u0648\\u0644 \\u062C\\u062F\\u06CC\\u062F\",\"Help\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"introFa\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"contentFa\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0645\\u062A\\u0646 \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionFa\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0628\\u0644\\u0627\\u06AF \\u0631\\u0627 \\u0648\\u0627\\u0631\\u062F \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptFa\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"\\u0686\\u06A9\\u06CC\\u062F\\u0647\\u200C\\u0627\\u06CC \\u06A9\\u0648\\u062A\\u0627\\u0647 \\u0627\\u0632 \\u0628\\u0644\\u0627\\u06AF\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionFa\",\"Caption\":\"\\u062A\\u0648\\u0636\\u06CC\\u062D\\u0627\\u062A \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 160 \\u06A9\\u0627\\u0631\\u0627\\u06A9\\u062A\\u0631\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsFa\",\"Caption\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0645\\u062A\\u0627 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"\\u06A9\\u0644\\u0645\\u0627\\u062A \\u06A9\\u0644\\u06CC\\u062F\\u06CC \\u0628\\u0627 \\u06A9\\u0627\\u0645\\u0627 \\u062C\\u062F\\u0627 \\u0634\\u0648\\u0646\\u062F\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"titleEn\",\"Caption\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"text\",\"PlaceHolder\":\"New Product Introduction\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"introEn\",\"Caption\":\"\\u0645\\u0642\\u062F\\u0645\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog introduction\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"contentEn\",\"Caption\":\"\\u0645\\u062D\\u062A\\u0648\\u0627 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog content\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"conclusionEn\",\"Caption\":\"\\u062C\\u0645\\u0639 \\u0628\\u0646\\u062F\\u06CC \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Enter blog conclusion\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"excerptEn\",\"Caption\":\"\\u062E\\u0644\\u0627\\u0635\\u0647 \\u0627\\u0646\\u06AF\\u0644\\u06CC\\u0633\\u06CC\",\"Type\":\"textarea\",\"PlaceHolder\":\"Short blog summary\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaDescriptionEn\",\"Caption\":\"Meta Description\",\"Type\":\"text\",\"PlaceHolder\":\"Max 160 characters\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"metaKeywordsEn\",\"Caption\":\"Meta Keywords\",\"Type\":\"text\",\"PlaceHolder\":\"keyword1, keyword2\",\"Help\":null,\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"slug\",\"Caption\":\"Slug\",\"Type\":\"text\",\"PlaceHolder\":\"new-product-introduction\",\"Help\":\"\\u0628\\u0631\\u0627\\u06CC \\u0622\\u062F\\u0631\\u0633 URL \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":[{\"Rule\":\"required\",\"Condition\":\"true\",\"Message\":\"Slug \\u0627\\u0644\\u0632\\u0627\\u0645\\u06CC \\u0627\\u0633\\u062A\"}]},{\"Name\":\"thumbnailFile\",\"Caption\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Type\":\"file\",\"PlaceHolder\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0627\\u0646\\u062A\\u062E\\u0627\\u0628 \\u06A9\\u0646\\u06CC\\u062F\",\"Help\":\"jpg, png (\\u062D\\u062F\\u0627\\u06A9\\u062B\\u0631 2MB)\",\"Order\":0,\"FetchConfig\":null,\"Options\":null,\"Rules\":null},{\"Name\":\"authorId\",\"Caption\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647\",\"Type\":\"dynamicSelect\",\"PlaceHolder\":null,\"Help\":\"\\u0646\\u0648\\u06CC\\u0633\\u0646\\u062F\\u0647 \\u0628\\u0644\\u0627\\u06AF\",\"Order\":0,\"FetchConfig\":{\"api\":\"Users/selectOption\",\"fetchFilters\":[]},\"Options\":null,\"Rules\":null}]");
        }
    }
}
