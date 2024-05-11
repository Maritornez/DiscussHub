using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class FK_Thread_User : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Thread_userID",
                table: "Thread",
                column: "userID");

            migrationBuilder.AddForeignKey(
                name: "FK_Thread_User",
                table: "Thread",
                column: "userID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Thread_User",
                table: "Thread");

            migrationBuilder.DropIndex(
                name: "IX_Thread_userID",
                table: "Thread");
        }
    }
}
