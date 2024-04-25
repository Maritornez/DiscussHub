﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

public partial class Thread
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("themeID")]
    public int ThemeId { get; set; }

    [Column("userID")]
    public int? UserId { get; set; }

    [Required]
    [Column("authorIpAddress")]
    [StringLength(100)]
    [Unicode(false)]
    public string AuthorIpAddress { get; set; }

    [Column("isPinned")]
    public bool IsPinned { get; set; }

    [Column("isArchieved")]
    public bool IsArchieved { get; set; }

    [Column("createdAd")]
    public DateTimeOffset CreatedAd { get; set; }

    [Column("lastPostDataTime")]
    public DateTimeOffset LastPostDataTime { get; set; }

    [InverseProperty("Thread")]
    public virtual ICollection<Post> Post { get; set; } = new List<Post>();

    [InverseProperty("Thread")]
    public virtual ICollection<Rating> Rating { get; set; } = new List<Rating>();

    [ForeignKey("ThemeId")]
    [InverseProperty("Thread")]
    public virtual Theme Theme { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Thread")]
    public virtual User User { get; set; }
}