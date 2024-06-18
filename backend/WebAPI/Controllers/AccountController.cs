using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        : Controller
    {
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    Email = model.Email, 
                    UserName = model.UserName,
                    DateTimeJoined = DateTimeOffset.Now,
                    LastVisited = DateTimeOffset.Now
                };
                // Добавление нового пользователя
                var result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    // Установка роли User
                    await userManager.AddToRoleAsync(user, "user");
                    // Установка куки
                    await signInManager.SignInAsync(user, false);
                    
                    var usr = await userManager.FindByEmailAsync(model.Email);
                    if (usr != null)
                    {
                        return Ok(new { message = "Выполнена регистрация",
                            email = usr.Email,
                            userName = usr.UserName,
                            dateTimeJoined = usr.DateTimeJoined, 
                            lastVisited = usr.LastVisited,
                            id = usr.Id });
                    }
                    else
                    {
                        return Ok(new
                        {
                            message = "Выполнена регистрация",
                            email = user.Email,
                            userName = user.UserName,
                            dateTimeJoined = user.DateTimeJoined,
                            lastVisited = user.LastVisited
                            // id не возрщащается, так как ответа от БД не получили
                        });
                    }

                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Пользователь не добавлен",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Created("", errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return Created("", errorMsg);
            }
        }

        
        
        
        [HttpPost]
        [Route("login")]
        //[AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                //var user = await userManager.FindByEmailAsync(model.Email);
                var user = await userManager.FindByNameAsync(model.Login);
                if (user?.UserName != null)
                { 
                    var result = await signInManager.PasswordSignInAsync(model.Login, 
                                                                         model.Password, 
                                                                         model.RememberMe, 
                                                                         false);
                    if (result.Succeeded)
                    {
                        var roles = await userManager.GetRolesAsync(user);
                        var userRole = roles.FirstOrDefault();
                        
                        
                        return Ok(new { message = "Выполнен вход", 
                                        email = user.Email,
                                        userName = user.UserName,
                                        dateTimeJoined = user.DateTimeJoined, 
                                        lastVisited = user.LastVisited,
                                        id = user.Id,
                                        userRole });
                    }
                    else
                    {
                        ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                        var errorMsg = new
                        {
                            message = "Вход не выполнен",
                            error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                        };
                        return Created("", errorMsg);
                    }
                }
                else
                {
                    var errorMsg = new
                    {
                        message = "Пользователь не найден",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Created("", errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return Created("", errorMsg);
            }
        }

        
        
        
        [HttpPost]
        [Route("logoff")]
        public async Task<IActionResult> LogOff()
        {
            var usr = await GetCurrentUserAsync();
            if (usr == null)
            {
                return Unauthorized(new { message = "Сначала выполните вход" });
            }
            // Удаление куки
            await signInManager.SignOutAsync();
            return Ok(new { message = "Выполнен выход", userName = usr.UserName });
        }

        
        
        
        [HttpGet]
        [Route("isauthenticated")]
        public async Task<IActionResult> IsAuthenticated()
        {
            var usr = await GetCurrentUserAsync();
            if (usr == null)
            {
                return Unauthorized(new { message = "Вы Гость. Пожалуйста, выполните вход" });
            }
            
            var roles = await userManager.GetRolesAsync(usr);
            var userRole = roles.FirstOrDefault();
            
            return Ok(new { message = "Сессия активна", 
                            email = usr.Email,
                            userName = usr.UserName,
                            dateTimeJoined = usr.DateTimeJoined, 
                            lastVisited = usr.LastVisited,
                            id = usr.Id,
                            userRole }); 
        }
        private Task<User?> GetCurrentUserAsync() => userManager.GetUserAsync(HttpContext.User);
        
        [HttpPost]
        [Route("EditEmail")]
        [Authorize]
        public async Task<IActionResult> EditEmail([FromBody] EditEmailViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                if (user == null)
                {
                    return Unauthorized(new { message = "Сначала выполните вход" });
                }

                user.Email = model.NewEmail;
                var result = await userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Электронная почта успешно изменена", email = user.Email });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Не удалось изменить электронную почту",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return BadRequest(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return BadRequest(errorMsg);
            }
        }
        
        [HttpPost]
        [Route("EditPassword")]
        [Authorize]
        public async Task<IActionResult> EditPassword([FromBody] EditPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                if (user == null)
                {
                    return Unauthorized(new { message = "Сначала выполните вход" });
                }

                var result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Пароль успешно изменен" });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Не удалось изменить пароль",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return BadRequest(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                return BadRequest(errorMsg);
            }
        }
    }
}