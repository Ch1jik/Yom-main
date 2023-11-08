using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ChangePurchase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_UserId",
                table: "Purchases");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Purchases",
                newName: "SellerId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_UserId",
                table: "Purchases",
                newName: "IX_Purchases_SellerId");

            migrationBuilder.AddColumn<string>(
                name: "BuyerId",
                table: "Purchases",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_BuyerId",
                table: "Purchases",
                column: "BuyerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_BuyerId",
                table: "Purchases",
                column: "BuyerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_SellerId",
                table: "Purchases",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_BuyerId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_SellerId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_BuyerId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "Purchases");

            migrationBuilder.RenameColumn(
                name: "SellerId",
                table: "Purchases",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Purchases_SellerId",
                table: "Purchases",
                newName: "IX_Purchases_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_UserId",
                table: "Purchases",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
