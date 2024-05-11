//using System;
//using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Table("Thread")]
public partial class Thread
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("themeID")]
    public int ThemeId { get; set; }

    [Column("userID")]
    [StringLength(450)]
    [Unicode(true)]
    public string? UserId { get; set; }

    [Column("authorIpAddress")]
    [StringLength(100)]
    [Unicode(true)]
    public string AuthorIpAddress { get; set; } = null!;

    [Column("isPinned")]
    public bool IsPinned { get; set; }

    [Column("isArchived")]
    public bool IsArchived { get; set; }

    [Column("createdAt")]
    public DateTimeOffset CreatedAt { get; set; }

    [Column("lastPostDateTime")]
    public DateTimeOffset LastPostDateTime { get; set; }

    [InverseProperty("Thread")]
    public virtual ICollection<Post> Post { get; set; } = new List<Post>();

    [InverseProperty("Thread")]
    public virtual ICollection<Rating> Rating { get; set; } = new List<Rating>();

    [ForeignKey("ThemeId")]
    [InverseProperty("Thread")]
    public virtual Theme? Theme { get; set; }
    
    [ForeignKey("UserId")]
    [InverseProperty("Thread")]
    public virtual User? User { get; set; }
}
