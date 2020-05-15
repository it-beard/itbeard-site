using Microsoft.EntityFrameworkCore.Migrations;

namespace Itbeard.Data.Migrations
{
    public partial class UpdateUrlShortGuidCollumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Urls_ShortGuid",
                table: "Urls");

            migrationBuilder.RenameColumn("ShortGuid", "Urls", "ShortName");
            
            migrationBuilder.CreateIndex(
                name: "IX_Urls_ShortName",
                table: "Urls",
                column: "ShortName",
                unique: true,
                filter: "[ShortName] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Urls_ShortName",
                table: "Urls");

            migrationBuilder.RenameColumn("ShortName", "Urls", "ShortGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Urls_ShortGuid",
                table: "Urls",
                column: "ShortGuid",
                unique: true,
                filter: "[ShortGuid] IS NOT NULL");
        }
    }
}
