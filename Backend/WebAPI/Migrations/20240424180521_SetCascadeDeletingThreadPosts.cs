using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class SetCascadeDeletingThreadPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Thread",
                table: "Post");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Thread",
                table: "Post",
                column: "threadID",
                principalTable: "Thread",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Thread",
                table: "Post");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Thread",
                table: "Post",
                column: "threadID",
                principalTable: "Thread",
                principalColumn: "ID");
        }
    }
}
