using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AdvertisementTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchase_Ads_AdId",
                table: "Purchase");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchase_AspNetUsers_UserId",
                table: "Purchase");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purchase",
                table: "Purchase");

            migrationBuilder.RenameTable(
                name: "Purchase",
                newName: "Purchases");

            migrationBuilder.RenameIndex(
                name: "IX_Purchase_UserId",
                table: "Purchases",
                newName: "IX_Purchases_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchase_AdId",
                table: "Purchases",
                newName: "IX_Purchases_AdId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purchases",
                table: "Purchases",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "decimal(20,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateExpired = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PhotoPaths = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkToCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClicksCount = table.Column<decimal>(type: "decimal(20,0)", nullable: false),
                    AdvertisementPlan = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Ads_AdId",
                table: "Purchases",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_UserId",
                table: "Purchases",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Ads_AdId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_UserId",
                table: "Purchases");

            migrationBuilder.DropTable(
                name: "Banners");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purchases",
                table: "Purchases");

            migrationBuilder.RenameTable(
                name: "Purchases",
                newName: "Purchase");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_UserId",
                table: "Purchase",
                newName: "IX_Purchase_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_AdId",
                table: "Purchase",
                newName: "IX_Purchase_AdId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purchase",
                table: "Purchase",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchase_Ads_AdId",
                table: "Purchase",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchase_AspNetUsers_UserId",
                table: "Purchase",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
