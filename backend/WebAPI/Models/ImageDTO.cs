namespace WebAPI.Models;

public class ImageDTO
{
    public IFormFile FormFile { get; set; } = null!;
    public string? UserId { get; set; }
    public int? PostId { get; set; }
    public int? ThemeId { get; set; }
}