﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

public partial class ForumContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public ForumContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // Метод вызывается автоматически при создании экземпляра контекста данных
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(Configuration.GetConnectionString("MsSqlServerConnection"));
    }

    //public ForumContext(DbContextOptions<ForumContext> options)
    //    : base(options)
    //{
    //}

    public virtual DbSet<Image> Image { get; set; }

    public virtual DbSet<Level> Level { get; set; }

    public virtual DbSet<Post> Post { get; set; }

    public virtual DbSet<Rating> Rating { get; set; }

    public virtual DbSet<Theme> Theme { get; set; }

    public virtual DbSet<Thread> Thread { get; set; }

    public virtual DbSet<User> User { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /*
         * Каскадные отношения:
         * При удалении темы удаляются все связанные с ней треды
         * При удалении треда удаляются все связанные с ним посты и рейтинги
         *
         * Но при удалении пользователя во все связанные с ним посты, рейтинги и треды подставляется UserId = NULL
         */

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasOne(d => d.Post)
                .WithMany(p => p.Image)
                .HasConstraintName("FK_Image_Post");

            entity.HasOne(d => d.Theme)
                .WithOne(p => p.Image)
                .HasConstraintName("FK_Image_Theme");
            
            entity.HasOne(d => d.User)
                .WithOne(p => p.Image)
                .HasConstraintName("FK_Image_User");
        });

        modelBuilder.Entity<Level>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("PK_PrivilegeLevel");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasOne(d => d.ReplyToPost)
                .WithMany(p => p.InverseReplyToPost)
                .HasConstraintName("FK_Post_Post");

            entity.HasOne(d => d.Thread)
                .WithMany(p => p.Post)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Post_Thread");

            entity.HasOne(d => d.User)
                .WithMany(p => p.Post)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Post_User");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasOne(d => d.Thread)
                .WithMany(p => p.Rating)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Rating_Thread");

            entity.HasOne(d => d.User)
                .WithMany(p => p.Rating)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Rating_User");
        });

        modelBuilder.Entity<Thread>(entity =>
        {
            entity.HasOne(d => d.Theme)
                .WithMany(p => p.Thread)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Thread_Theme");

            entity.HasOne(d => d.User)
                .WithMany(p => p.Thread)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Thread_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.PassHash)
                .IsFixedLength();

            entity.HasOne(d => d.Level)
                .WithMany(p => p.User)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Level");
        });
        
        modelBuilder.Entity<Theme>()
            .HasIndex(t => t.Name)
            .IsUnique();

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

