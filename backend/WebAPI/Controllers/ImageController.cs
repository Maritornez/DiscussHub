using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Context;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class ImageController(ForumContext context) : ControllerBase
    {
        // GET: api/<ImageController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var path = Directory.GetCurrentDirectory();
            UploadImage(new ImageDTO());
            
                
            return Ok(await context.Image
                .Include(i => i.Post)
                .Include(i => i.Theme)
                .Include(i => i.User)
                .ToListAsync());
        }

        // GET api/<ImageController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var image = await context.Image
                .Include(i => i.Post)
                .Include(i => i.Theme)
                .Include(i => i.User)
                .FirstOrDefaultAsync(i => i.Id == id); 
            
            if (image == null)
            {
                return NotFound();
            }
            
            return Ok(image);
        }

        // GET api/<ImageController>/GetByPostId/5
        [HttpGet("GetByPostId/{postId:int}")]
        public async Task<IActionResult> GetByPostId(int postId)
        {
            var image = await context.Image
                .Include(i => i.Post)
                .Include(i => i.Theme)
                .Include(i => i.User)
                .Where(i => i.PostId == postId)
                .ToListAsync();
            
            if (image == null)
            {
                return NotFound();
            }
            
            return Ok(image);
        }
        
        // GET api/<ImageController>/GetFileByPostId/5
        [HttpGet("GetFileByPostId/{postId:int}")]
        public async Task<IActionResult> GetFileByPostId(int postId)
        {
            var image = await context.Image
                .FirstOrDefaultAsync(i => i.PostId == postId);
            
            if (image == null)
            {
                return NotFound();
            }
            
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", image.Name);
            
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }
            
            var imageFile = System.IO.File.OpenRead(imagePath);
            
            var mimeType = GetMimeType(image.Name); // метод для определения MIME-типа

            return File(imageFile, mimeType, image.Name);
        }
        
        // Метод для определения MIME-типа файла по его расширению
        private string GetMimeType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return extension switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                _ => "application/octet-stream",
            };
        }
        

        // POST api/<ImageController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] ImageDTO file)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var imageName = UploadImage(file);

                var image = new Image
                {
                    Name = imageName,
                    UserId = file.UserId,
                    PostId = file.PostId,
                    ThemeId = file.ThemeId
                };
                
                // Вывести image в консоль
                Console.WriteLine(image);

                context.Image.Add(image);
                await context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        private static string UploadImage([FromForm] ImageDTO file)
        {
            try
            {
                // Создать директорию wwwroot, если она еще не существует
                if (!Directory.Exists("Images"))
                {
                    Directory.CreateDirectory("Images");
                }
                
                // string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
                //
                // using (var stream = new FileStream(path, FileMode.Create))
                // {
                //     file.FormFile.CopyTo(stream);
                // }
                
                var imageName = new String(Path.GetFileNameWithoutExtension(file.FormFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FormFile.FileName);
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    file.FormFile.CopyTo(fileStream);
                }
                return imageName;
            }
            catch
            {
                return "Error while uploading image"; 
            }
        }

        // PUT api/<ImageController>/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }
            
            context.Entry(image).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
                {
                    return NotFound();
                }

                throw;
            }


            var result = await context.Image.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/<ImageController>/5
        [HttpDelete("deleteById/{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteById(int id)
        {
            var image = await context.Image.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            DeleteImageFile(image.Name);

            context.Image.Remove(image);
            await context.SaveChangesAsync();
            
            return Ok(image);
        }
        
        [HttpDelete("deleteByName/{name}")]
        [Authorize]
        public async Task<IActionResult> DeleteByName(string name)
        {
            var image = await context.Image
                .FirstOrDefaultAsync(i => i.Name == name);
            
            if (image == null)
            {
                return NotFound();
            }

            DeleteImageFile(image.Name);

            context.Image.Remove(image);
            await context.SaveChangesAsync();
            
            return Ok(image);
        }
        
        private void DeleteImageFile(string fileName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            Ok();
        }
        
        
        
        // Auxiliary functions
        private bool ImageExists(int id)
        {
            return context.Image.Any(e => e.Id == id);
        }
    }
}
