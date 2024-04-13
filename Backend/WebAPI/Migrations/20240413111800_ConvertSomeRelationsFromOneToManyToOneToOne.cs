using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ConvertSomeRelationsFromOneToManyToOneToOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Image_themeID",
                table: "Image");

            migrationBuilder.DropIndex(
                name: "IX_Image_UserId",
                table: "Image");

            migrationBuilder.CreateIndex(
                name: "IX_Image_themeID",
                table: "Image",
                column: "themeID",
                unique: true,
                filter: "[themeID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Image_UserId",
                table: "Image",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Image_themeID",
                table: "Image");

            migrationBuilder.DropIndex(
                name: "IX_Image_UserId",
                table: "Image");

            migrationBuilder.CreateIndex(
                name: "IX_Image_themeID",
                table: "Image",
                column: "themeID");

            migrationBuilder.CreateIndex(
                name: "IX_Image_UserId",
                table: "Image",
                column: "UserId");
        }
    }
}
