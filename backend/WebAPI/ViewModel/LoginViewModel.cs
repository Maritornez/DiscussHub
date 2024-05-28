using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModel
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Login")]
        public string Login { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; } = null!;

        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }

    }
}