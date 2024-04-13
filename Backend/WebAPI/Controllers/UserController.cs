using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using WebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class UserController(ForumContext context) : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.User
                .Include(u => u.Post)
                .Include(u => u.Rating)
                .Include(u => u.Thread)
                .Include(u => u.Image)
                .ToListAsync());
        }

        // GET api/<UserController>/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await context.User
                .Include(u => u.Post)
                .Include(u => u.Rating)
                .Include(u => u.Thread)
                .Include(u => u.Image)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.PassHash = BcryptHashPassword(user.PassHash);

            context.User.Add(user);
            await context.SaveChangesAsync();
            

            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            user.PassHash = BcryptHashPassword(user.PassHash);
            
            context.Entry(user).State = EntityState.Modified;
            
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }

                throw;
            }


            var result = await context.User.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            context.User.Remove(user);
            await context.SaveChangesAsync();
            
            return Ok(user);
        }

        // Auxiliary functions
        private bool UserExists(int id)
        {
            return context.User.Any(e => e.Id == id);
        }

        private static string BcryptHashPassword(string password)
        {
            // Generate a random salt
            var salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password with the salt
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        private static bool BcryptVerifyPassword(string password, string hashedPassword)
        {
            // Check the password against the hashed password
            var verified = BCrypt.Net.BCrypt.Verify(password, hashedPassword);

            return verified;
        }
    }
}