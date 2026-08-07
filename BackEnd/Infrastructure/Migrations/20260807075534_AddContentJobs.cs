using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddContentJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Source = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValue: "ai-pipeline"),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    SeedTopicsJson = table.Column<string>(type: "text", nullable: false),
                    CandidateKeywordsJson = table.Column<string>(type: "text", nullable: true),
                    SelectedKeyword = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    SelectedTopic = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    OutlineJson = table.Column<string>(type: "text", nullable: true),
                    QualityReportJson = table.Column<string>(type: "text", nullable: true),
                    BlogId = table.Column<int>(type: "integer", nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    NotificationSent = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<int>(type: "integer", nullable: true),
                    UpdatedBy = table.Column<int>(type: "integer", nullable: true),
                    DeletedBy = table.Column<int>(type: "integer", nullable: true)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentJobs");
        }
    }
}
