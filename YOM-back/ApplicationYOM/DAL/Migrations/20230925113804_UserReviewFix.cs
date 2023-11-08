using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UserReviewFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Users_UserId",
                table: "UserReviews");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserReviews",
                newName: "UserSenderId");

            migrationBuilder.RenameIndex(
                name: "IX_UserReviews_UserId",
                table: "UserReviews",
                newName: "IX_UserReviews_UserSenderId");

            migrationBuilder.AddColumn<decimal>(
                name: "UserReceiverId",
                table: "UserReviews",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_UserReceiverId",
                table: "UserReviews",
                column: "UserReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Users_UserReceiverId",
                table: "UserReviews",
                column: "UserReceiverId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews",
                column: "UserSenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Users_UserReceiverId",
                table: "UserReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_UserReceiverId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "UserReceiverId",
                table: "UserReviews");

            migrationBuilder.RenameColumn(
                name: "UserSenderId",
                table: "UserReviews",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserReviews_UserSenderId",
                table: "UserReviews",
                newName: "IX_UserReviews_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Users_UserId",
                table: "UserReviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
