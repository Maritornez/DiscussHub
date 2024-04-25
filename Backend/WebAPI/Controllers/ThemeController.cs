using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class ThemeController(ForumContext context) : ControllerBase
    {
        // GET: api/<Theme>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.Theme
                .Include(t => t.Image)
                .Include(t => t.Thread)
                .ToListAsync());
        }
        
        // GET: api/Theme/WithoutThreads
        [HttpGet("WithoutThreads")]
        public async Task<IActionResult> GetThemesWithoutThreads()
        {
            return Ok(await context.Theme
                .Include(t => t.Image)
                .ToListAsync());
        }
        

        // GET api/<Theme>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var theme = await context.Theme
                .Include(t => t.Image)
                .Include(t => t.Thread)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (theme == null)
            {
                return NotFound();
            }

            return Ok(theme);
        }
        
        // GET: api/Theme/ThemeWithoutThreads/5
        [HttpGet("WithoutThreads/{id:int}")]
        public async Task<IActionResult> GetThemeWithoutThreads(int id)
        {
            var theme = await context.Theme
                .Include(t => t.Image)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (theme == null)
            {
                return NotFound();
            }

            return Ok(theme);
        }
        
        // GET api/<Theme>/name
        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var theme = await context.Theme
                .Include(t => t.Image)
                .Include(t => t.Thread)
                .FirstOrDefaultAsync(t => t.Name == name);

            if (theme == null)
            {
                return NotFound();
            }

            return Ok(theme);
        }
        
        // POST api/<ThemeController>
        [HttpPost]
        public async Task<IActionResult> Post(Theme theme)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Theme.Add(theme);
            await context.SaveChangesAsync();
            

            return CreatedAtAction("Get", new { id = theme.Id }, theme);
        }
        
        // PUT api/<Theme>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, Theme theme)
        {
            if (id != theme.Id)
            {
                return BadRequest();
            }
            
            context.Entry(theme).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThemeExists(id))
                {
                    return NotFound();
                }

                throw;
            }
            
            var result = await context.Theme.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        
        // DELETE api/<Theme>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var theme = await context.Theme.FindAsync(id);

            if (theme == null)
            {
                return NotFound();
            }

            context.Theme.Remove(theme);
            await context.SaveChangesAsync();

            return Ok(theme);
        }

        // Auxiliary functions
        private bool ThemeExists(int id)
        {
            return context.Theme.Any(e => e.Id == id);
        }
    }
}