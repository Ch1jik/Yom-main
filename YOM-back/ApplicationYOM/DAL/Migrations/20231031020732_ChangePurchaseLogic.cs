using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ChangePurchaseLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Purchases",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ApplicationUserId",
                table: "Purchases",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_ApplicationUserId",
                table: "Purchases",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_ApplicationUserId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ApplicationUserId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Purchases");
        }
    }
}
