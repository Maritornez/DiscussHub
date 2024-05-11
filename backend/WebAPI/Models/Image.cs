using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Table("Image")]
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
    [StringLength(450)]
    [Unicode()]
    public string? UserId { get; set; }

    [Column("name")]
    [StringLength(50)]
    [Unicode()]
    public string Name { get; set; } = null!;

    [Column("filePath")]
    [StringLength(1000)]
    [Unicode()]
    public string FilePath { get; set; } = null!;

    [ForeignKey("PostId")]
    [InverseProperty("Image")]
    public virtual Post? Post { get; set; }

    [ForeignKey("ThemeId")]
    [InverseProperty("Image")]
    public virtual Theme? Theme { get; set; }
    
    [ForeignKey("UserId")]
    [InverseProperty("Image")]
    public virtual User? User { get; set; }
}
