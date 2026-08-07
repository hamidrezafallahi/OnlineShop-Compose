using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DropContentJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentJobs");

            migrationBuilder.UpdateData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 1,
                column: "ColumnsJson",
                value: "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"Slug\",\"Accessor\":\"slug\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Accessor\":\"titleFa\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Accessor\":\"thumbnailFile\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"\\u0648\\u0636\\u0639\\u06CC\\u062A \\u0641\\u0639\\u0627\\u0644\",\"Accessor\":\"isActive\",\"Type\":\"bool\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BlogId = table.Column<int>(type: "integer", nullable: true),
                    CandidateKeywordsJson = table.Column<string>(type: "text", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    NotificationSent = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    OutlineJson = table.Column<string>(type: "text", nullable: true),
                    QualityReportJson = table.Column<string>(type: "text", nullable: true),
                    SeedTopicsJson = table.Column<string>(type: "text", nullable: false),
                    SelectedKeyword = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    SelectedTopic = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Source = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValue: "ai-pipeline"),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentJobs_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.UpdateData(
                table: "EntityConfigs",
                keyColumn: "Id",
                keyValue: 1,
                column: "ColumnsJson",
                value: "[{\"Header\":\"\\u0634\\u0646\\u0627\\u0633\\u0647\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":null},{\"Header\":\"Slug\",\"Accessor\":\"slug\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0641\\u0627\\u0631\\u0633\\u06CC\",\"Accessor\":\"titleFa\",\"Type\":\"text\",\"Sortable\":true,\"Filterable\":true,\"Options\":null},{\"Header\":\"\\u062A\\u0635\\u0648\\u06CC\\u0631 \\u0634\\u0627\\u062E\\u0635\",\"Accessor\":\"thumbnailFile\",\"Type\":\"image\",\"Sortable\":false,\"Filterable\":false,\"Options\":null}]");

            migrationBuilder.CreateIndex(
                name: "IX_ContentJobs_BlogId",
                table: "ContentJobs",
                column: "BlogId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentJobs_CreatedAt",
                table: "ContentJobs",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ContentJobs_Status",
                table: "ContentJobs",
                column: "Status");
        }
    }
}
