using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using WebAPI.Context;
using WebAPI.Controllers;
using WebAPI.Models;
using Xunit;

namespace WebAPI.Tests
{
    public class PostControllerTests
    {
        private readonly DbContextOptions<ForumContext> _options;

        public PostControllerTests()
        {
            _options = new DbContextOptionsBuilder<ForumContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
        }

        private ForumContext GetContext()
        {
            var context = new ForumContext(_options);
            
            // Ensure the database is clean before each test
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Seed the database with test data
            var user = new User
            {
                Id = "1",
                UserName = "TestUser",
                DateTimeJoined = DateTimeOffset.Now,
                LastVisited = DateTimeOffset.Now
            };
            var thread = new WebAPI.Models.Thread
            {
                Id = 1,
                ThemeId = 1,
                UserId = "1",
                IsPinned = false,
                IsArchived = false,
                CreatedAt = DateTimeOffset.Now,
                LastPostDateTime = DateTimeOffset.Now
            };

            context.User.Add(user);
            context.Thread.Add(thread);
            context.Post.Add(new Post
            {
                Id = 1,
                ThreadId = 1,
                UserId = "1",
                IsOriginalPost = true,
                Title = "Test Post 1",
                Text = "This is a test post 1",
                CreatedAt = DateTimeOffset.Now
            });
            context.Post.Add(new Post
            {
                Id = 2,
                ThreadId = 1,
                UserId = "1",
                IsOriginalPost = false,
                Title = "Test Post 2",
                Text = "This is a test post 2",
                CreatedAt = DateTimeOffset.Now
            });
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task Get_ReturnsAllPosts()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);

            // Act
            var result = await controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var posts = Assert.IsAssignableFrom<IEnumerable<Post>>(okResult.Value);
            Assert.Equal(2, posts.Count());
        }

        [Fact]
        public async Task Get_WithId_ReturnsPost()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);

            // Act
            var result = await controller.Get(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var post = Assert.IsType<Post>(okResult.Value);
            Assert.Equal(1, post.Id);
        }

        [Fact]
        public async Task Get_WithId_ReturnsNotFound()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);

            // Act
            var result = await controller.Get(99);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Post_CreatesNewPost()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);
            var newPost = new Post
            {
                Id = 3,
                ThreadId = 1,
                UserId = "1",
                IsOriginalPost = false,
                Title = "New Test Post",
                Text = "This is a new test post",
                CreatedAt = DateTimeOffset.Now
            };

            // Act
            var result = await controller.Post(newPost);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var post = Assert.IsType<Post>(createdAtActionResult.Value);
            Assert.Equal(3, post.Id);
            Assert.Equal("New Test Post", post.Title);
        }

        [Fact]
        public async Task Put_UpdatesPost()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);
            var postToUpdate = new Post
            {
                Id = 1,
                ThreadId = 1,
                UserId = "1",
                IsOriginalPost = true,
                Title = "Updated Test Post",
                Text = "This is an updated test post",
                CreatedAt = DateTimeOffset.Now
            };

            // Detach the existing entity to avoid tracking conflict
            var existingPost = await context.Post.FindAsync(1);
            if (existingPost != null)
            {
                context.Entry(existingPost).State = EntityState.Detached;
            }
            else
            {
                throw new Exception("Post not found");
            }

            // Act
            var result = await controller.Put(1, postToUpdate);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var post = Assert.IsType<Post>(okResult.Value);
            Assert.Equal(1, post.Id);
            Assert.Equal("Updated Test Post", post.Title);
        }

        [Fact]
        public async Task Delete_RemovesPost()
        {
            // Arrange
            using var context = GetContext();
            var controller = new PostController(context);

            // Act
            var result = await controller.Delete(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var post = Assert.IsType<Post>(okResult.Value);
            Assert.Equal(1, post.Id);

            // Verify the post was removed
            Assert.Null(await context.Post.FindAsync(1));
        }
    }
}
