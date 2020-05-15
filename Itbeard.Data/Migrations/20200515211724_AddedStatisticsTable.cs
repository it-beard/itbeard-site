using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Itbeard.Data.Migrations
{
    public partial class AddedStatisticsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UrlId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    IpAddress = table.Column<string>(nullable: true),
                    ReferrerUrl = table.Column<string>(nullable: true),
                    Device = table.Column<string>(nullable: true),
                    DeviceBrand = table.Column<string>(nullable: true),
                    DeviceModel = table.Column<string>(nullable: true),
                    OperationSystem = table.Column<string>(nullable: true),
                    Browser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Statistics_Urls_UrlId",
                        column: x => x.UrlId,
                        principalTable: "Urls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Statistics_UrlId",
                table: "Statistics",
                column: "UrlId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Statistics");
        }
    }
}
