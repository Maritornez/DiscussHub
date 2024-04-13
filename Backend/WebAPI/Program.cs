using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using WebAPI.Models;
using WebAPI.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builderA =>
    {
        builderA.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });
});

// Add services to the container.
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


var app = builder.Build(); // объект app - это веб-приложение

using (var scope = app.Services.CreateScope())
{
    var bloggingContext = scope.ServiceProvider.GetRequiredService<ForumContext>(); 
    await ForumContextSeed.SeedAsync(bloggingContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();