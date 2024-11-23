using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModel;

public class EditPasswordViewModel
{
    [Required]
    public required string CurrentPassword { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 6)]
    [RegularExpression("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\\\-=\\\\[\\\\]{};':\\\"\\\\\\\\|,.<>\\\\/?])[a-zA-Z0-9!@#$%^&*()_+\\\\-=\\\\[\\\\]{};':\\\"\\\\\\\\|,.<>\\\\/?]+$\n", 
        ErrorMessage = "Пароль должен содержать хотя бы одну цифру и один специальный символ.")]
    public required string NewPassword { get; set; }
}