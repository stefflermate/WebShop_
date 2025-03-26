using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using WebShop_.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ CORS beállítások (engedélyezett források kezelése)
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin() // Fejlesztői környezetben mindent engedünk (de élesben pontosítsd!)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// 2️⃣ Adatbázis kapcsolat beállítása
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3️⃣ JSON konfiguráció beállítása (UTF-8 támogatás)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(System.Text.Unicode.UnicodeRanges.All); // UTF-8 teljes támogatása
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; // (Opcionális) JSON mezők kisbetűs formátumra állítása
    });

// 4️⃣ Swagger dokumentáció bekapcsolása
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 5️⃣ Az alkalmazás indítása
var app = builder.Build();

// 6️⃣ CORS engedélyezése
app.UseCors(MyAllowSpecificOrigins);

// 7️⃣ Fejlesztői eszközök bekapcsolása (Swagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 8️⃣ Engedélyezett végpontok és API beállítások
app.UseAuthorization();
app.MapControllers();

// 9️⃣ Az alkalmazás elindítása
app.Run();
