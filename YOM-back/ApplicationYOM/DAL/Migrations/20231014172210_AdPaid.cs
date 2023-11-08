using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AdPaid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdvertisementPlan",
                table: "Banners",
                newName: "BannerAdvertisementPlan");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStarted",
                table: "Banners",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "AdvertisementPlan",
                table: "Ads",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Ads",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaidUntil",
                table: "Ads",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateStarted",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "AdvertisementPlan",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "PaidUntil",
                table: "Ads");

            migrationBuilder.RenameColumn(
                name: "BannerAdvertisementPlan",
                table: "Banners",
                newName: "AdvertisementPlan");
        }
    }
}
