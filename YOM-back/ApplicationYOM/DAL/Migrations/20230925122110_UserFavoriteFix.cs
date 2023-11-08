using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UserFavoriteFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteAds_Ads_AdId",
                table: "FavoriteAds");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteAds_Users_UserId",
                table: "FavoriteAds");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteAds_Ads_AdId",
                table: "FavoriteAds",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteAds_Users_UserId",
                table: "FavoriteAds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteAds_Ads_AdId",
                table: "FavoriteAds");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteAds_Users_UserId",
                table: "FavoriteAds");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteAds_Ads_AdId",
                table: "FavoriteAds",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteAds_Users_UserId",
                table: "FavoriteAds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
