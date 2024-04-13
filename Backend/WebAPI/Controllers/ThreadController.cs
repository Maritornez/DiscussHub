using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using WebAPI.Models;
using Thread = WebAPI.Models.Thread;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class ThreadController(ForumContext context) : ControllerBase
    {
        // GET: api/<ThreadController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.Thread
                .Include(t => t.Post)
                .Include(t => t.Rating)
                .Include(t => t.Theme)
                .Include(t => t.User)
                .ToListAsync());
        }

        // GET api/<ThreadController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var thread = await context.Thread
                .Include(t => t.Post)
                .Include(t => t.Rating)
                .Include(t => t.Theme)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (thread == null)
            {
                return NotFound();
            }

            return Ok(thread);
        }

        // POST api/<ThreadController>
        [HttpPost]
        public async Task<IActionResult> Post(Thread thread)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Thread.Add(thread);
            await context.SaveChangesAsync();
            

            return CreatedAtAction("Get", new { id = thread.Id }, thread);
        }

        // PUT api/<ThreadController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, Thread thread)
        {
            if (id != thread.Id)
            {
                return BadRequest();
            }
            
            context.Entry(thread).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThreadExists(id))
                {
                    return NotFound();
                }

                throw;
            }


            var result = await context.Thread.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/<ThreadController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thread = await context.Thread.FindAsync(id);

            if (thread == null)
            {
                return NotFound();
            }

            context.Thread.Remove(thread);
            await context.SaveChangesAsync();
            
            return Ok(thread);
        }
        
        // Auxiliary functions
        private bool ThreadExists(int id)
        {
            return context.Thread.Any(e => e.Id == id);
        }
    }
}
