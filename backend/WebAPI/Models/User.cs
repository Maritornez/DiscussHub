using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace WebAPI.Models;

public partial class User : IdentityUser
{
    // [Key]
    // [Column("ID")]
    // public int Id { get; set; }

    // [Column("levelID")]
    // public int LevelId { get; set; }

    // [Required]
    // [Column("name")]
    // [StringLength(50)]
    // [Unicode(false)]
    // public string Name { get; set; }

    // [Required]
    // [Column("login")]
    // [StringLength(50)]
    // [Unicode(false)]
    // public string Login { get; set; }

    // [Required]
    // [Column("passHash")]
    // [StringLength(60)]
    // [Unicode(false)]
    // public string PassHash { get; set; }

    // [Required]
    // [Column("email")]
    // [StringLength(50)]
    // [Unicode(false)]
    // public string Email { get; set; }

    [Column("dateTimeJoined")]
    public DateTimeOffset DateTimeJoined { get; set; }

    [Column("lastVisited")]
    public DateTimeOffset LastVisited { get; set; }

    // [ForeignKey("LevelId")]
    // [InverseProperty("User")]
    // public virtual Level Level { get; set; }
    
    [InverseProperty("User")]
    public virtual ICollection<Post> Post { get; set; } = new List<Post>();
    
    [InverseProperty("User")]
    public virtual ICollection<Rating> Rating { get; set; } = new List<Rating>();
    
    [InverseProperty("User")]
    public virtual ICollection<Thread> Thread { get; set; } = new List<Thread>();
    
    [InverseProperty("User")]
    public virtual Image? Image { get; set; }
}