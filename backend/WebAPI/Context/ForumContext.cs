using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WebAPI.Models;
using Thread = WebAPI.Models.Thread;
// ReSharper disable StringLiteralTypo

namespace WebAPI.Context;

public partial class ForumContext : IdentityDbContext<User>
{
    public ForumContext()
    {
    }

    public ForumContext(DbContextOptions<ForumContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Image> Image { get; set; }

    //public virtual DbSet<Level> Level { get; set; }

    public virtual DbSet<Post> Post { get; set; }

    public virtual DbSet<Rating> Rating { get; set; }

    public virtual DbSet<Theme> Theme { get; set; }

    public virtual DbSet<Thread> Thread { get; set; }
    
    public virtual DbSet<User> User { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=DiscussHub;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;MultipleActiveResultSets=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasOne(d => d.Post).WithMany(p => p.Image).HasConstraintName("FK_Image_Post");

            entity.HasOne(d => d.Theme).WithMany(p => p.Image).HasConstraintName("FK_Image_Theme");
            
            entity.HasOne(d => d.User).WithOne(p => p.Image).HasConstraintName("FK_Image_User");
        });

        // modelBuilder.Entity<Level>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("PK_PrivilegeLevel");
        // });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasOne(d => d.ReplyToPost).WithMany(p => p.InverseReplyToPost).HasConstraintName("FK_Post_Post");

            entity.HasOne(d => d.Thread).WithMany(p => p.Post)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Post_Thread");
            
            entity.HasOne(d => d.User).WithMany(p => p.Post)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Post_User");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasOne(d => d.Thread).WithMany(p => p.Rating)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Rating_Thread");

            entity.HasOne(d => d.User).WithMany(p => p.Rating)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Rating_User");
        });

        modelBuilder.Entity<Thread>(entity =>
        {
            entity.HasOne(d => d.Theme).WithMany(p => p.Thread)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Thread_Theme");
            
            entity.HasOne(d => d.User).WithMany(p => p.Thread)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Thread_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
