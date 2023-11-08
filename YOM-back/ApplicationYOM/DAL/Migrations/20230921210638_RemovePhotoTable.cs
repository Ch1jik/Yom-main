using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class RemovePhotoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_PhotoPath_PathToPhotos",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Users_UserId",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_PhotoPath_PathToPhoto",
                table: "Categories");

            migrationBuilder.DropTable(
                name: "PhotoPath");

            migrationBuilder.DropIndex(
                name: "IX_Categories_PathToPhoto",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Ads_PathToPhotos",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "PathToPhoto",
                table: "Categories");

            migrationBuilder.AlterColumn<decimal>(
                name: "UserId",
                table: "Ads",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(20,0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PathToPhotos",
                table: "Ads",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Users_UserId",
                table: "Ads",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Users_UserId",
                table: "Ads");

            migrationBuilder.AddColumn<string>(
                name: "PathToPhoto",
                table: "Categories",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "UserId",
                table: "Ads",
                type: "decimal(20,0)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(20,0)");

            migrationBuilder.AlterColumn<string>(
                name: "PathToPhotos",
                table: "Ads",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "PhotoPath",
                columns: table => new
                {
                    MainFolderPath = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<decimal>(type: "decimal(20,0)", nullable: true),
                    AdId = table.Column<decimal>(type: "decimal(20,0)", nullable: true),
                    CategoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PathToPhoto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoPath", x => x.MainFolderPath);
                    table.ForeignKey(
                        name: "FK_PhotoPath_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_PathToPhoto",
                table: "Categories",
                column: "PathToPhoto",
                unique: true,
                filter: "[PathToPhoto] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_PathToPhotos",
                table: "Ads",
                column: "PathToPhotos",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPath_UserId",
                table: "PhotoPath",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_PhotoPath_PathToPhotos",
                table: "Ads",
                column: "PathToPhotos",
                principalTable: "PhotoPath",
                principalColumn: "MainFolderPath",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Users_UserId",
                table: "Ads",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_PhotoPath_PathToPhoto",
                table: "Categories",
                column: "PathToPhoto",
                principalTable: "PhotoPath",
                principalColumn: "MainFolderPath");
        }
    }
}
