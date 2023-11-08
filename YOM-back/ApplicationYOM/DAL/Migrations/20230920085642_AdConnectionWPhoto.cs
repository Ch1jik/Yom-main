using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AdConnectionWPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhotoPath_Ads_AdId",
                table: "PhotoPath");

            migrationBuilder.DropIndex(
                name: "IX_PhotoPath_AdId",
                table: "PhotoPath");

            migrationBuilder.AddColumn<string>(
                name: "PathToPhotos",
                table: "Ads",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_PathToPhotos",
                table: "Ads",
                column: "PathToPhotos",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_PhotoPath_PathToPhotos",
                table: "Ads",
                column: "PathToPhotos",
                principalTable: "PhotoPath",
                principalColumn: "MainFolderPath",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_PhotoPath_PathToPhotos",
                table: "Ads");

            migrationBuilder.DropIndex(
                name: "IX_Ads_PathToPhotos",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "PathToPhotos",
                table: "Ads");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPath_AdId",
                table: "PhotoPath",
                column: "AdId");

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoPath_Ads_AdId",
                table: "PhotoPath",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id");
        }
    }
}
