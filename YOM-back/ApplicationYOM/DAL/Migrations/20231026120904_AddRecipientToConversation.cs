using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AddRecipientToConversation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConversations_AspNetUsers_UserId",
                table: "UserConversations");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserConversations",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "RecipientId",
                table: "UserConversations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserConversations_RecipientId",
                table: "UserConversations",
                column: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConversations_AspNetUsers_RecipientId",
                table: "UserConversations",
                column: "RecipientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConversations_AspNetUsers_UserId",
                table: "UserConversations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConversations_AspNetUsers_RecipientId",
                table: "UserConversations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserConversations_AspNetUsers_UserId",
                table: "UserConversations");

            migrationBuilder.DropIndex(
                name: "IX_UserConversations_RecipientId",
                table: "UserConversations");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "UserConversations");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserConversations",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserConversations_AspNetUsers_UserId",
                table: "UserConversations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
