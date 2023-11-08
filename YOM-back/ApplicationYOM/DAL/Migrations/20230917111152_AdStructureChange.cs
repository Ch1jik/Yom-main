using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AdStructureChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Adress",
                table: "Ads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Ads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId",
                table: "Ads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ads_SubCategoryId",
                table: "Ads",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_SubCategories_SubCategoryId",
                table: "Ads",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_SubCategories_SubCategoryId",
                table: "Ads");

            migrationBuilder.DropIndex(
                name: "IX_Ads_SubCategoryId",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "Adress",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Ads");
        }
    }
}
