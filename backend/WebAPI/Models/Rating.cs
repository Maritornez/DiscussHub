using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Table("Rating")]
public partial class Rating
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("threadID")]
    public int ThreadId { get; set; }

    [Column("userID")]
    [StringLength(450)]
    [Unicode(true)]
    public string? UserId { get; set; }

    [Column("isPositive")]
    public bool IsPositive { get; set; }

    [ForeignKey("ThreadId")]
    [InverseProperty("Rating")]
    public virtual Thread? Thread { get; set; }
    
    [ForeignKey("UserId")]
    [InverseProperty("Rating")]
    public virtual User? User { get; set; }
}
