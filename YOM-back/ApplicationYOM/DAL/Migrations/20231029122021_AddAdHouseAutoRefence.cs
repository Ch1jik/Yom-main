using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AddAdHouseAutoRefence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AutoId",
                table: "Ads",
                type: "decimal(20,0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Ads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "HouseId",
                table: "Ads",
                type: "decimal(20,0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Ads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Autos",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "decimal(20,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SaleCondition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReleaseDate = table.Column<long>(type: "bigint", nullable: true),
                    Mileage = table.Column<double>(type: "float", nullable: true),
                    FuelType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gearbox = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeatCount = table.Column<long>(type: "bigint", nullable: true),
                    BodyType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCleared = table.Column<bool>(type: "bit", nullable: true),
                    CarFrom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TechnicalState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Houses",
                columns: table => new
                {
                    Id = table.Column<decimal>(type: "decimal(20,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuildingsType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Furniture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Renovation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Heating = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FloorSize = table.Column<long>(type: "bigint", nullable: true),
                    RoomCount = table.Column<long>(type: "bigint", nullable: true),
                    Floor = table.Column<long>(type: "bigint", nullable: true),
                    Square = table.Column<double>(type: "float", nullable: true),
                    HouseSquare = table.Column<double>(type: "float", nullable: true),
                    KitchenSquare = table.Column<double>(type: "float", nullable: true),
                    Realtor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Houses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ads_AutoId",
                table: "Ads",
                column: "AutoId");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_HouseId",
                table: "Ads",
                column: "HouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Autos_AutoId",
                table: "Ads",
                column: "AutoId",
                principalTable: "Autos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Houses_HouseId",
                table: "Ads",
                column: "HouseId",
                principalTable: "Houses",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Autos_AutoId",
                table: "Ads");

            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Houses_HouseId",
                table: "Ads");

            migrationBuilder.DropTable(
                name: "Autos");

            migrationBuilder.DropTable(
                name: "Houses");

            migrationBuilder.DropIndex(
                name: "IX_Ads_AutoId",
                table: "Ads");

            migrationBuilder.DropIndex(
                name: "IX_Ads_HouseId",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "AutoId",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "HouseId",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Ads");
        }
    }
}
