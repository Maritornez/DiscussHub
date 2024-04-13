using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAvatarToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Image",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Image_UserId",
                table: "Image",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_User",
                table: "Image",
                column: "UserId",
                principalTable: "User",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_User",
                table: "Image");

            migrationBuilder.DropIndex(
                name: "IX_Image_UserId",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Image");
        }
    }
}
