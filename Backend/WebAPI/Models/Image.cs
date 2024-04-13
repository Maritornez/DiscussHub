﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

public partial class Image
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("postID")]
    public int? PostId { get; set; }

    [Column("themeID")]
    public int? ThemeId { get; set; }
    
    [Column("userID")]
    public int? UserID { get; set; }


    [Required]
    [Column("name")]
    [StringLength(50)]
    [Unicode(false)]
    public string Name { get; set; }

    [Required]
    [Column("filePath")]
    [StringLength(1000)]
    [Unicode(false)]
    public string FilePath { get; set; }

    [ForeignKey("PostId")]
    [InverseProperty("Image")]
    public virtual Post Post { get; set; }

    [ForeignKey("ThemeId")]
    [InverseProperty("Image")]
    public virtual Theme Theme { get; set; }
    
    [ForeignKey("UserId")]
    [InverseProperty("Image")]
    public virtual User User { get; set; }
}