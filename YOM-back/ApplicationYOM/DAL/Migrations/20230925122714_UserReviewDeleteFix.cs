using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UserReviewDeleteFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews",
                column: "UserSenderId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Users_UserSenderId",
                table: "UserReviews",
                column: "UserSenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
