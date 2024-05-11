using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Rating_userID",
                table: "Rating",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_userID",
                table: "Post",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_Image_userID",
                table: "Image",
                column: "userID",
                unique: true,
                filter: "[userID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_User",
                table: "Image",
                column: "userID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_User",
                table: "Post",
                column: "userID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_User",
                table: "Rating",
                column: "userID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_User",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_User",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Rating_userID",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Post_userID",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Image_userID",
                table: "Image");
        }
    }
}
