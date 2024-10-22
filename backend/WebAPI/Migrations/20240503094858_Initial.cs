﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Level",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivilegeLevel", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Theme",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Theme", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Thread",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    themeID = table.Column<int>(type: "int", nullable: false),
                    userID = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    authorIpAddress = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    isPinned = table.Column<bool>(type: "bit", nullable: false),
                    isArchieved = table.Column<bool>(type: "bit", nullable: false),
                    createdAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    lastPostDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thread", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Thread_Theme",
                        column: x => x.themeID,
                        principalTable: "Theme",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    threadID = table.Column<int>(type: "int", nullable: false),
                    replyToPostID = table.Column<int>(type: "int", nullable: true),
                    userID = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    isOriginalPost = table.Column<bool>(type: "bit", nullable: false),
                    title = table.Column<string>(type: "varchar(300)", unicode: false, maxLength: 300, nullable: false),
                    text = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    createdAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    authorIpAdress = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Post_Post",
                        column: x => x.replyToPostID,
                        principalTable: "Post",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Post_Thread",
                        column: x => x.threadID,
                        principalTable: "Thread",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    threadID = table.Column<int>(type: "int", nullable: false),
                    userID = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    isPositive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rating_Thread",
                        column: x => x.threadID,
                        principalTable: "Thread",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    postID = table.Column<int>(type: "int", nullable: true),
                    themeID = table.Column<int>(type: "int", nullable: true),
                    userID = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    filePath = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Image_Post",
                        column: x => x.postID,
                        principalTable: "Post",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Image_Theme",
                        column: x => x.themeID,
                        principalTable: "Theme",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Image_postID",
                table: "Image",
                column: "postID");

            migrationBuilder.CreateIndex(
                name: "IX_Image_themeID",
                table: "Image",
                column: "themeID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_replyToPostID",
                table: "Post",
                column: "replyToPostID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_threadID",
                table: "Post",
                column: "threadID");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_threadID",
                table: "Rating",
                column: "threadID");

            migrationBuilder.CreateIndex(
                name: "IX_Name",
                table: "Theme",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Thread_themeID",
                table: "Thread",
                column: "themeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "Level");

            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "Thread");

            migrationBuilder.DropTable(
                name: "Theme");
        }
    }
}
