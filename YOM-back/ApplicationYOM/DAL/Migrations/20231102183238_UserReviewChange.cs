using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UserReviewChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_ApplicationUserId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_AspNetUsers_UserReceiverId",
                table: "UserReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_AspNetUsers_UserSenderId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_UserReceiverId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_UserSenderId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ApplicationUserId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "UserReceiverId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "UserSenderId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Purchases");

            migrationBuilder.AddColumn<decimal>(
                name: "AdId",
                table: "UserReviews",
                type: "decimal(20,0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoPaths",
                table: "UserReviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReceiverId",
                table: "UserReviews",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SenderId",
                table: "UserReviews",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_AdId",
                table: "UserReviews",
                column: "AdId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_ReceiverId",
                table: "UserReviews",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_SenderId",
                table: "UserReviews",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_Ads_AdId",
                table: "UserReviews",
                column: "AdId",
                principalTable: "Ads",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_AspNetUsers_ReceiverId",
                table: "UserReviews",
                column: "ReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_AspNetUsers_SenderId",
                table: "UserReviews",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_Ads_AdId",
                table: "UserReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_AspNetUsers_ReceiverId",
                table: "UserReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_AspNetUsers_SenderId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_AdId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_ReceiverId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_SenderId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "AdId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "PhotoPaths",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "UserReviews");

            migrationBuilder.AddColumn<string>(
                name: "UserReceiverId",
                table: "UserReviews",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserSenderId",
                table: "UserReviews",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "UserReviews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Purchases",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_UserReceiverId",
                table: "UserReviews",
                column: "UserReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_UserSenderId",
                table: "UserReviews",
                column: "UserSenderId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_AspNetUsers_UserReceiverId",
                table: "UserReviews",
                column: "UserReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_AspNetUsers_UserSenderId",
                table: "UserReviews",
                column: "UserSenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
