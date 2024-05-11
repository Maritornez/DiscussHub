using WebAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace WebAPI.Data;

public static class IdentitySeed
{
    public static async Task CreateUserRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
        
        // Создание ролей администратора, модератора и пользователя
        if (await roleManager.FindByNameAsync("admin") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("admin"));
        }
        if (await roleManager.FindByNameAsync("moderator") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("moderator"));
        }
        if (await roleManager.FindByNameAsync("user") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("user"));
        }
        
        // Создание Администратора
        const string adminEmail = "admin@mail.com";
        const string adminPassword = "Aa123456!";
        if (await userManager.FindByNameAsync(adminEmail) == null)
        {
            var admin = new User { Email = adminEmail, UserName = adminEmail };
            var result = await userManager.CreateAsync(admin, adminPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "admin");
            }
        }
        
        // Создание Модератора
        const string moderatorEmail = "moderator@mail.com";
        const string moderatorPassword = "Aa123456!";
        if (await userManager.FindByNameAsync(moderatorEmail) == null)
        {
            var moderator = new User { Email = moderatorEmail, UserName = moderatorEmail };
            var result = await userManager.CreateAsync(moderator, moderatorPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(moderator, "moderator");
            }
        }
        
        // Создание Пользователя
        const string userEmail = "user@mail.com";
        const string userPassword = "Aa123456!";
        if (await userManager.FindByNameAsync(userEmail) == null)
        {
            var user = new User { Email = userEmail, UserName = userEmail };
            var result = await userManager.CreateAsync(user, userPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "user");
            }
        }
    }
}
