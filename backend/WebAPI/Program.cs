using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;
using WebAPI.Context;
using WebAPI.Models;
using WebAPI.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    // options.AddDefaultPolicy(builderA =>
    // {
    //     builderA.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    // });
    options.AddPolicy("AllowSpecificOrigin",
        builderA =>
        {
            builderA.WithOrigins("http://localhost:3000") // замените на URL вашего клиентского приложения
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

// Add services to the container.
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ForumContext>();
// Choose DB
/**************************************************************************************************************************************************/
builder.Services.AddDbContext<ForumContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("MsSqlServerConnection")));
//builder.Services.AddDbContext<ForumContext>(opt => opt.UseInMemoryDatabase("ForumDB"));
/**************************************************************************************************************************************************/
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Добавляется сервис, который предоставляет метаданные о конечных точках API. Это необходимо для интеграции с инструментами документации, такими как Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
// Добавляется сервис Swagger, который генерирует спецификацию OpenAPI для нашего API на основе контроллеров и их атрибутов маршрутизации.
builder.Services.AddSwaggerGen();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Устанавливает временной интервал, на который будет заблокирована учетная запись после превышения лимита неудачных попыток входа
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 10;
    options.Lockout.AllowedForNewUsers = true;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "ForumApp";
    options.Cookie.SameSite = SameSiteMode.None; // Установка SameSite в None
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Установка Secure в Always
    options.LoginPath = "/";
    options.AccessDeniedPath = "/";
    options.LogoutPath = "/";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    // Возвращать 401 при вызове недоступных методов для роли
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});




var app = builder.Build(); // объект app - это веб-приложение

using (var scope = app.Services.CreateScope())
{
    var bloggingContext = scope.ServiceProvider.GetRequiredService<ForumContext>(); 
    await ForumContextSeed.SeedAsync(bloggingContext);
    await IdentitySeed.CreateUserRoles(scope.ServiceProvider);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();