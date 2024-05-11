using System.Threading.Tasks;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Data;

public class ForumContextSeed
{
    public static async Task SeedAsync(ForumContext context)
    {
        context.Database.EnsureCreated();
            
        // if (context.Level.Any())
        // {
        //     return;
        // }
        //
        // // Adding Levels
        // var levels = new Level[]
        // {
        //     new Level { Name = "Regular User" },
        //     new Level { Name = "Moderator" },
        //     new Level { Name = "Administrator" }
        // };
        // foreach (var level in levels)
        // {
        //     context.Level.Add(level);
        // }
        await context.SaveChangesAsync();
    }
}
