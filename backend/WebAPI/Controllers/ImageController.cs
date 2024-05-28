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

        // POST api/<ImageController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Image image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Image.Add(image);
            await context.SaveChangesAsync();
            

            return CreatedAtAction("Get", new { id = image.Id }, image);
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
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var image = await context.Image.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            context.Image.Remove(image);
            await context.SaveChangesAsync();
            
            return Ok(image);
        }
        
        
        
        // Auxiliary functions
        private bool ImageExists(int id)
        {
            return context.Image.Any(e => e.Id == id);
        }
    }
}
