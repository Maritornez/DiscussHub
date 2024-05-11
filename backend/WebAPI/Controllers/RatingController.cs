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
    public class RatingController(ForumContext context) : ControllerBase
    {
        // GET: api/<RatingController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.Rating
                .Include(r => r.Thread)
                .Include(r => r.User)
                .ToListAsync());
        }

        // GET api/<RatingController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var rating = await context.Rating
                .Include(r => r.Thread)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);
            
            if (rating == null)
            {
                return NotFound();
            }

            return Ok(rating);
        }

        // POST api/<RatingController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Rating rating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Rating.Add(rating);
            await context.SaveChangesAsync();
            
            
            return CreatedAtAction("Get", new { id = rating.Id }, rating);
        }

        // PUT api/<RatingController>/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, Rating rating)
        {
            if (id != rating.Id)
            {
                return BadRequest();
            }
            
            context.Entry(rating).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(id))
                {
                    return NotFound();
                }

                throw;
            }


            var result = await context.Rating.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/<RatingController>/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var rating = await context.Rating.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            context.Rating.Remove(rating);
            await context.SaveChangesAsync();
            
            return Ok(rating);
        }
        
        // Auxiliary functions
        private bool RatingExists(int id)
        {
            return context.Rating.Any(e => e.Id == id);
        }
    }
}
