using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class CategoryPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "PhotoPath",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PathToPhoto",
                table: "Categories",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_PathToPhoto",
                table: "Categories",
                column: "PathToPhoto",
                unique: true,
                filter: "[PathToPhoto] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_PhotoPath_PathToPhoto",
                table: "Categories",
                column: "PathToPhoto",
                principalTable: "PhotoPath",
                principalColumn: "MainFolderPath");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_PhotoPath_PathToPhoto",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_PathToPhoto",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "PhotoPath");

            migrationBuilder.DropColumn(
                name: "PathToPhoto",
                table: "Categories");
        }
    }
}
