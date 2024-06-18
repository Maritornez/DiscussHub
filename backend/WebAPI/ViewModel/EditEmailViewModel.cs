using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModel;

public class EditEmailViewModel
{
    [Required]
    [EmailAddress]
    public string NewEmail { get; set; }
}