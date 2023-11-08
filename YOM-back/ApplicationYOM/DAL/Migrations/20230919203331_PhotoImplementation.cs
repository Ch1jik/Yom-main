using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class PhotoImplementation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PhotoPath",
                columns: table => new
                {
                    MainFolderPath = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PhotoName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PathToPhoto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<decimal>(type: "decimal(20,0)", nullable: true),
                    AdId = table.Column<decimal>(type: "decimal(20,0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoPath", x => x.MainFolderPath);
                    table.ForeignKey(
                        name: "FK_PhotoPath_Ads_AdId",
                        column: x => x.AdId,
                        principalTable: "Ads",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhotoPath_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPath_AdId",
                table: "PhotoPath",
                column: "AdId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPath_UserId",
                table: "PhotoPath",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhotoPath");
        }
    }
}
