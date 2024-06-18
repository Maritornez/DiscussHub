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
    public class PostController(ForumContext context) : ControllerBase
    {
        // GET: api/<PostController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.Post
                .Include(p => p.Image)
                .Include(p => p.InverseReplyToPost)
                .Include(p => p.ReplyToPost)
                .Include(p => p.Thread)
                .Include(p => p.User)
                .ToListAsync());
        }

        // GET api/<PostController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var post = await context.Post
                .Include(p => p.Image)
                .Include(p => p.InverseReplyToPost)
                .Include(p => p.ReplyToPost)
                .Include(p => p.Thread)
                .Include(p => p.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }
        
        //
        // GET api/<PostController>/WithThreadId/5
        [HttpGet("WithThreadId/{id:int}")]
        public async Task<IActionResult> GetWithThreadId(int id)
        {
            var post = await context.Post
                .Include(p => p.Image)
                .Include(p => p.InverseReplyToPost)
                .Include(p => p.ReplyToPost)
                .Include(p => p.Thread)
                .Include(p => p.User)
                .Where(p => p.ThreadId == id)
                .ToListAsync();

            if (post.Count == 0)
            {
                return NotFound();
            }

            return Ok(post);
        }
        
        // POST api/<PostController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Post.Add(post);
            await context.SaveChangesAsync();
            
            // Create post to return
            var postToPush = await context.Post
                .Include(p => p.Image)
                .Include(p => p.InverseReplyToPost)
                .Include(p => p.ReplyToPost)
                .Include(p => p.Thread)
                .Include(p => p.User)
                .FirstOrDefaultAsync(t => t.Id == post.Id);
            
            // // Load data about User who created post
            // var user = await context.User.FindAsync(post.UserId);
            // if (user == null)
            // {
            //     // If user not found, return BadRequest
            //     return BadRequest("Invalid UserId");
            // }
            //
            // // Load data about User who created post
            // post.User = user;
            
            
            return CreatedAtAction("Get", new { id = post.Id }, postToPush);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            
            context.Entry(post).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }

                throw;
            }


            var result = await context.Post.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }
            
            var postImages = await context.Image
                .Where(i => i.PostId == id)
                .ToListAsync();
            
            // Сначала удаляются все связанные с постом изображения
            foreach (var image in postImages)
            {

                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", image.Name);
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
                
                context.Image.Remove(image);
            }
            context.Post.Remove(post);
            await context.SaveChangesAsync();
            
            return Ok(post);
        }
        
        // Auxiliary functions
        private bool PostExists(int id)
        {
            return context.Post.Any(e => e.Id == id);
        }
    }
}
