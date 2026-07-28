using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <summary>
    /// After browserApiBaseUrl became '/api', FetchConfig.api values must be relative
    /// controller paths (e.g. Users/selectOption), not api/Users/selectOption.
    /// This migration strips the redundant api/ (or /api/) prefix from stored JSON.
    /// </summary>
    public partial class NormalizeEntityConfigSelectOptionUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                UPDATE "EntityConfigs"
                SET "FormFieldsJson" = REPLACE(
                        REPLACE("FormFieldsJson", '"api":"/api/', '"api":"'),
                        '"api":"api/',
                        '"api":"'
                    )
                WHERE "FormFieldsJson" IS NOT NULL
                  AND (
                        "FormFieldsJson" LIKE '%"api":"api/%'
                     OR "FormFieldsJson" LIKE '%"api":"/api/%'
                  );
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Best-effort reverse for known selectOption endpoints only.
            migrationBuilder.Sql(
                """
                UPDATE "EntityConfigs"
                SET "FormFieldsJson" = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
                        "FormFieldsJson",
                        '"api":"Users/selectOption"', '"api":"api/Users/selectOption"'),
                        '"api":"users/selectOption"', '"api":"api/users/selectOption"'),
                        '"api":"Products/selectOption"', '"api":"api/Products/selectOption"'),
                        '"api":"Categories/selectOption"', '"api":"api/Categories/selectOption"'),
                        '"api":"Brands/selectOption"', '"api":"api/Brands/selectOption"'),
                        '"api":"Blogs/selectOption"', '"api":"api/Blogs/selectOption"'),
                        '"api":"productOffers/selectOption"', '"api":"api/productOffers/selectOption"'),
                        '"api":"discounts/selectOption"', '"api":"api/discounts/selectOption"')
                WHERE "FormFieldsJson" IS NOT NULL
                  AND "FormFieldsJson" LIKE '%/selectOption%';

                UPDATE "EntityConfigs"
                SET "FormFieldsJson" = REPLACE(
                        "FormFieldsJson",
                        '"api":"tags/selectOption"',
                        '"api":"api/tags/selectOption"'
                    )
                WHERE "FormFieldsJson" IS NOT NULL
                  AND "FormFieldsJson" LIKE '%"api":"tags/selectOption"%';
                """);
        }
    }
}
