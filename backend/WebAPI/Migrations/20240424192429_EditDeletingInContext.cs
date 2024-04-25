using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class EditDeletingInContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Thread",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Thread_Theme",
                table: "Thread");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Thread",
                table: "Rating",
                column: "threadID",
                principalTable: "Thread",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Thread_Theme",
                table: "Thread",
                column: "themeID",
                principalTable: "Theme",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Thread",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Thread_Theme",
                table: "Thread");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Thread",
                table: "Rating",
                column: "threadID",
                principalTable: "Thread",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Thread_Theme",
                table: "Thread",
                column: "themeID",
                principalTable: "Theme",
                principalColumn: "ID");
        }
    }
}
