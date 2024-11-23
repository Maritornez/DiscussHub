using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModel;

public class EditEmailViewModel
{
    [Required]
    [EmailAddress]
    public required string NewEmail { get; set; }
}