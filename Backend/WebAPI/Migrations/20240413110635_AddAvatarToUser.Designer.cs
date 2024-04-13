﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

#nullable disable

namespace WebAPI.Migrations
{
    [DbContext(typeof(ForumContext))]
    [Migration("20240413110635_AddAvatarToUser")]
    partial class AddAvatarToUser
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPI.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .IsUnicode(false)
                        .HasColumnType("varchar(1000)")
                        .HasColumnName("filePath");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<int?>("PostId")
                        .HasColumnType("int")
                        .HasColumnName("postID");

                    b.Property<int?>("ThemeId")
                        .HasColumnType("int")
                        .HasColumnName("themeID");

                    b.Property<int?>("UserID")
                        .HasColumnType("int")
                        .HasColumnName("userID");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("ThemeId");

                    b.HasIndex("UserId");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("WebAPI.Models.Level", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .IsUnicode(false)
                        .HasColumnType("varchar(1000)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("PK_PrivilegeLevel");

                    b.ToTable("Level");
                });

            modelBuilder.Entity("WebAPI.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AuthorIpAdress")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("authorIpAdress");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("datetimeoffset")
                        .HasColumnName("createdAt");

                    b.Property<bool>("IsOriginalPost")
                        .HasColumnType("bit")
                        .HasColumnName("isOriginalPost");

                    b.Property<int?>("ReplyToPostId")
                        .HasColumnType("int")
                        .HasColumnName("replyToPostID");

                    b.Property<string>("Text")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)")
                        .HasColumnName("text");

                    b.Property<int>("ThreadId")
                        .HasColumnType("int")
                        .HasColumnName("threadID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(300)
                        .IsUnicode(false)
                        .HasColumnType("varchar(300)")
                        .HasColumnName("title");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("userID");

                    b.HasKey("Id");

                    b.HasIndex("ReplyToPostId");

                    b.HasIndex("ThreadId");

                    b.HasIndex("UserId");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("WebAPI.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsPositive")
                        .HasColumnType("bit")
                        .HasColumnName("isPositive");

                    b.Property<int>("ThreadId")
                        .HasColumnType("int")
                        .HasColumnName("threadID");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("userID");

                    b.HasKey("Id");

                    b.HasIndex("ThreadId");

                    b.HasIndex("UserId");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("WebAPI.Models.Theme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("Theme");
                });

            modelBuilder.Entity("WebAPI.Models.Thread", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AuthorIpAddress")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("authorIpAddress");

                    b.Property<DateTimeOffset>("CreatedAd")
                        .HasColumnType("datetimeoffset")
                        .HasColumnName("createdAd");

                    b.Property<bool>("IsArchieved")
                        .HasColumnType("bit")
                        .HasColumnName("isArchieved");

                    b.Property<bool>("IsPinned")
                        .HasColumnType("bit")
                        .HasColumnName("isPinned");

                    b.Property<DateTimeOffset>("LastPostDataTime")
                        .HasColumnType("datetimeoffset")
                        .HasColumnName("lastPostDataTime");

                    b.Property<int>("ThemeId")
                        .HasColumnType("int")
                        .HasColumnName("themeID");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("userID");

                    b.HasKey("Id");

                    b.HasIndex("ThemeId");

                    b.HasIndex("UserId");

                    b.ToTable("Thread");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("DateTimeJoined")
                        .HasColumnType("datetimeoffset")
                        .HasColumnName("dateTimeJoined");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email");

                    b.Property<DateTimeOffset>("LastVisited")
                        .HasColumnType("datetimeoffset")
                        .HasColumnName("lastVisited");

                    b.Property<int>("LevelId")
                        .HasColumnType("int")
                        .HasColumnName("levelID");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("login");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<string>("PassHash")
                        .IsRequired()
                        .HasMaxLength(60)
                        .IsUnicode(false)
                        .HasColumnType("char(60)")
                        .HasColumnName("passHash")
                        .IsFixedLength();

                    b.HasKey("Id");

                    b.HasIndex("LevelId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("WebAPI.Models.Image", b =>
                {
                    b.HasOne("WebAPI.Models.Post", "Post")
                        .WithMany("Image")
                        .HasForeignKey("PostId")
                        .HasConstraintName("FK_Image_Post");

                    b.HasOne("WebAPI.Models.Theme", "Theme")
                        .WithMany("Image")
                        .HasForeignKey("ThemeId")
                        .HasConstraintName("FK_Image_Theme");

                    b.HasOne("WebAPI.Models.User", "User")
                        .WithMany("Image")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_Image_User");

                    b.Navigation("Post");

                    b.Navigation("Theme");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.Post", b =>
                {
                    b.HasOne("WebAPI.Models.Post", "ReplyToPost")
                        .WithMany("InverseReplyToPost")
                        .HasForeignKey("ReplyToPostId")
                        .HasConstraintName("FK_Post_Post");

                    b.HasOne("WebAPI.Models.Thread", "Thread")
                        .WithMany("Post")
                        .HasForeignKey("ThreadId")
                        .IsRequired()
                        .HasConstraintName("FK_Post_Thread");

                    b.HasOne("WebAPI.Models.User", "User")
                        .WithMany("Post")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_Post_User");

                    b.Navigation("ReplyToPost");

                    b.Navigation("Thread");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.Rating", b =>
                {
                    b.HasOne("WebAPI.Models.Thread", "Thread")
                        .WithMany("RatingNavigation")
                        .HasForeignKey("ThreadId")
                        .IsRequired()
                        .HasConstraintName("FK_Rating_Thread");

                    b.HasOne("WebAPI.Models.User", "User")
                        .WithMany("Rating")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_Rating_User");

                    b.Navigation("Thread");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.Thread", b =>
                {
                    b.HasOne("WebAPI.Models.Theme", "Theme")
                        .WithMany("Thread")
                        .HasForeignKey("ThemeId")
                        .IsRequired()
                        .HasConstraintName("FK_Thread_Theme");

                    b.HasOne("WebAPI.Models.User", "User")
                        .WithMany("Thread")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_Thread_User");

                    b.Navigation("Theme");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.HasOne("WebAPI.Models.Level", "Level")
                        .WithMany("User")
                        .HasForeignKey("LevelId")
                        .IsRequired()
                        .HasConstraintName("FK_User_Level");

                    b.Navigation("Level");
                });

            modelBuilder.Entity("WebAPI.Models.Level", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.Post", b =>
                {
                    b.Navigation("Image");

                    b.Navigation("InverseReplyToPost");
                });

            modelBuilder.Entity("WebAPI.Models.Theme", b =>
                {
                    b.Navigation("Image");

                    b.Navigation("Thread");
                });

            modelBuilder.Entity("WebAPI.Models.Thread", b =>
                {
                    b.Navigation("Post");

                    b.Navigation("RatingNavigation");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Navigation("Image");

                    b.Navigation("Post");

                    b.Navigation("Rating");

                    b.Navigation("Thread");
                });
#pragma warning restore 612, 618
        }
    }
}
