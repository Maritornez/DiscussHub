// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Cors;
// using Microsoft.AspNetCore.Authorization;
// using WebAPI.Context;
// using WebAPI.Models;
//
//
// //using System.Reflection.Metadata;
//
// // For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//
// namespace WebAPI.Controllers
// {
//     [Route("api/[controller]")]
//     [EnableCors]
//     [ApiController]
//     public class LevelController(ForumContext context) : ControllerBase
//     {
//         // GET: api/<Level>
//         [HttpGet]
//         public async Task<IActionResult> Get()
//         {
//             return  Ok(await context.Level
//                 //.Include(l => l.User)
//                 .ToListAsync()
//             );
//         }
//
//         // GET api/<Level>/5
//         [HttpGet("{id:int}")]
//         public async Task<IActionResult> Get(int id)
//         {
//             var level = await context.Level
//                 //.Include(l => l.User)
//                 .FirstOrDefaultAsync(l => l.Id == id);
//
//
//             if (level == null)
//             {
//                 return NotFound();
//             }
//
//             return Ok(level);
//         }
//
//         // POST api/<Level>
//         [HttpPost]
//         [Authorize(Roles = "admin")]
//         public async Task<IActionResult> Post(Level level)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }
//
//             context.Level.Add(level);
//             await context.SaveChangesAsync();
//
//             return CreatedAtAction("Get", new { id = level.Id }, level);
//         }
//
//         // PUT api/<Level>/5
//         [HttpPut("{id:int}")]
//         [Authorize(Roles = "admin")]
//         public async Task<IActionResult> Put(int id, Level level)
//         {
//             if (id != level.Id)
//             {
//                 return BadRequest();
//             }
//
//             context.Entry(level).State = EntityState.Modified;
//
//             try
//             {
//                 await context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!LevelExists(id))
//                 {
//                     return NotFound();
//                 }
//
//                 throw;
//             }
//
//
//             var result = await context.Level.FindAsync(id);
//
//             if (result == null)
//             {
//                 return NotFound();
//             }
//
//             return Ok(result);
//         }
//
//         // DELETE api/<Level>/5
//         [HttpDelete("{id:int}")]
//         [Authorize(Roles = "admin")]
//         public async Task<IActionResult> Delete(int id)
//         {
//             var level = await context.Level.FindAsync(id);
//
//             if (level == null)
//             {
//                 return NotFound();
//             }
//
//             context.Level.Remove(level);
//             await context.SaveChangesAsync();
//
//
//             return Ok(level);
//         }
//
//         // Auxiliary functions
//         private bool LevelExists(int id)
//         {
//             return context.Level.Any(e => e.Id == id);
//         }
//     }
// }
