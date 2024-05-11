using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

[Table("Post")]
public partial class Post
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("threadID")]
    public int ThreadId { get; set; }

    [Column("replyToPostID")]
    public int? ReplyToPostId { get; set; }

    [Column("userID")]
    [StringLength(450)]
    [Unicode(true)]
    public string? UserId { get; set; }

    [Column("isOriginalPost")]
    public bool IsOriginalPost { get; set; }

    [Column("title")]
    [StringLength(300)]
    [Unicode(true)]
    public string Title { get; set; }

    [Column("text")]
    [Unicode(true)]
    public string Text { get; set; }

    [Column("createdAt")]
    public DateTimeOffset CreatedAt { get; set; }

    [Column("authorIpAddress")]
    [StringLength(100)]
    [Unicode(true)]
    public string AuthorIpAddress { get; set; } = null!;

    [InverseProperty("Post")]
    public virtual ICollection<Image> Image { get; set; } = new List<Image>();

    [InverseProperty("ReplyToPost")]
    public virtual ICollection<Post> InverseReplyToPost { get; set; } = new List<Post>();

    [ForeignKey("ReplyToPostId")]
    [InverseProperty("InverseReplyToPost")]
    public virtual Post? ReplyToPost { get; set; }

    [ForeignKey("ThreadId")]
    [InverseProperty("Post")]
    public virtual Thread? Thread { get; set; }
    
    [ForeignKey("UserId")]
    [InverseProperty("Post")]
    public virtual User? User { get; set; }
}
