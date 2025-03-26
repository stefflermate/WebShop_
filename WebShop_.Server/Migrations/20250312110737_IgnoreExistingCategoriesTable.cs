using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop_.Server.Migrations
{
    /// <inheritdoc />
    public partial class IgnoreExistingCategoriesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Csak az idegen kulcsok és indexek maradjanak!

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SellerId",
                table: "Products",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Sellers_SellerId",
                table: "Products",
                column: "SellerId",
                principalTable: "Sellers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Products_Categories_CategoryId", table: "Products");
            migrationBuilder.DropForeignKey(name: "FK_Products_Sellers_SellerId", table: "Products");
            migrationBuilder.DropIndex(name: "IX_Products_CategoryId", table: "Products");
            migrationBuilder.DropIndex(name: "IX_Products_SellerId", table: "Products");
        }

    }
}
