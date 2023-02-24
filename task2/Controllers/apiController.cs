using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using task2.Models;
using System.Configuration;


namespace task2.Controllers
{
    public class apiController : Controller
    {
        private ApplicationContext db;
        
        public apiController(ApplicationContext context)
        {
            db = context;
        }
        //1. Get all books. Order by provided value (title or author)
        // GET https://{{baseUrl}}/api/books?order=author
        [HttpGet("api/books/")]
        public string books(string order="title")
        {
            if (order.ToLower() == "title")
            {
                var temp = from b in db.Books
                       orderby b.Title
                       select new BookDTO
                       {
                           Id = b.Id,
                           Title = b.Title,
                           Author = b.Author,
                           ReviewsNumber = b.Reviews.Count(),
                           Rating = Convert.ToDecimal((from r in b.Ratings
                                                       select r.Score).Average())
                       };
                List<BookDTO> res = temp.ToList<BookDTO>();
                return JsonConvert.SerializeObject(res);
            }
            else
            {
                var temp = from b in db.Books
                       orderby b.Author
                       select new BookDTO
                       {
                           Id = b.Id,
                           Title = b.Title,
                           Author = b.Author,
                           ReviewsNumber = b.Reviews.Count(),
                           Rating = Convert.ToDecimal((from r in b.Ratings
                                                       select r.Score).Average())
                       };
                List<BookDTO> res = temp.ToList<BookDTO>();
                return JsonConvert.SerializeObject(res);
            }
             
            
        }

        //2. Get top 10 books with high rating and number of reviews greater than 10.
        //You can filter books by specifying genre. Order by rating
        //GET https://{{baseUrl}}/api/recommended?genre=horror
        [HttpGet("api/recommended/")]
        public string recommend(string genre)
        {
            IQueryable<Book> query = db.Books;
           if (genre != null)
            {
                query = from b in query where b.Genre == genre select b;
            }
            var temp = from b in query
                       
                       where b.Reviews.Count >10//because of it it will have no results
                       orderby (from r in b.Ratings
                                select r.Score).Average() descending
                       select new BookDTO 
                       {
                           Id = b.Id,
                           Title = b.Title,
                           Author = b.Author,
                           ReviewsNumber = b.Reviews.Count(),
                           Rating = Convert.ToDecimal((from r in b.Ratings
                                                       select r.Score).Average())
                       };
            List<BookDTO> res = temp.ToList<BookDTO>();       
            return JsonConvert.SerializeObject(res.Take(10));
            
        }

        //3. Get book details with the list of reviews
        //GET https://{{baseUrl}}/api/books/{id}
        [HttpGet("api/books/{id:int}")]
        public string books(int id)
        {
            BookWithReviews book = (from b in db.Books
                       where b.Id == id
                       select new BookWithReviews
                       {
                           Id = b.Id,
                           Title = b.Title,
                           Author = b.Author,
                           Content = b.Content,
                           Cover = b.Cover,
                           Rating = Convert.ToDecimal((from r in b.Ratings
                                                       select r.Score).Average()),
                           Reviews = (from r in b.Reviews select new ReviewDTO
                           {
                               Id = r.Id,
                               Message = r.Message,
                               Reviewer = r.Reviewer
                           }).ToList<ReviewDTO>()
                       }).First();
            return JsonConvert.SerializeObject(book);
        }

        //4. Delete a book using a secret key. Save the secret key in the config of your application. Compare this key with a query param
       // DELETE https://{{baseUrl}}/api/books/{id}?secret=qwerty
        [HttpDelete("api/books/{id:int}/{secret}")]
        public ActionResult books(int id, string secret)
        {
            string sec = ConfigurationManager.AppSettings["secret"];
            if (sec != secret)
            {
                return BadRequest("Wrong secret");
            }
            Book book = db.Books.FirstOrDefault(p => p.Id == id);
            if (book != null)
            {
                db.Books.Remove(book);
                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Book not found");   
        }


        //### 5. Save a new book.
       // POST https://{{baseUrl}}/api/books/save
        [HttpPost("api/books/save")]
        public string func(Book book)
        {
            if (book.Id == 0)
            {
                db.Books.Add(book);
            }
            else
            {
                db.Books.Attach(book);
            }
            db.SaveChanges();
            IdDTO id = new IdDTO(book.Id);
            return JsonConvert.SerializeObject(id);
        }


        //### 6. Save a review for the book.
        //PUT https://{{baseUrl}}/api/books/{id}/review
        [HttpPut("api/books/{id:int}/review")]
        public string review(int id, Review review)
        {
            review.BookId = id;
            review.Id = 0;
            db.Reviews.Add(review);
            db.SaveChanges();
            IdDTO res = new IdDTO(review.Id);
            return JsonConvert.SerializeObject(res);
        }

        //### 7. Rate a book
        //PUT https://{{baseUrl}}/api/books/{id}/rate
        [HttpPut("api/books/{id:int}/rate")]
        public ActionResult rate(int id, int rate)
        {
            if (rate>5 || rate < 1)
            {
                return BadRequest("Uncorrect rate");
            }
            Rating r = new Rating();
            r.BookId = id;
            r.Score = rate;
            db.Ratings.Add(r);
            db.SaveChanges();
            return Ok();
        }

        public IActionResult Index()
        {
            
            return View();
        }
    }
}
