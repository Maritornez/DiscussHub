using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Table("Theme")]
[Index("Name", Name = "IX_Name", IsUnique = true)]
public partial class Theme
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(100)]
    [Unicode()]
    public string Name { get; set; } = null!;

    [Column("description")]
    [Unicode()]
    public string Description { get; set; } = null!;

    [InverseProperty("Theme")]
    public virtual ICollection<Image> Image { get; set; } = new List<Image>();

    [InverseProperty("Theme")]
    public virtual ICollection<Thread> Thread { get; set; } = new List<Thread>();
}
