using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using task2.Models;

namespace task2.Controllers
{
    public class apiController : Controller
    {
        private ApplicationContext db;
        public apiController(ApplicationContext context)
        {
            db = context;
        }
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

        //Get top 10 books with high rating and number of reviews greater than 10.
        //You can filter books by specifying genre. Order by rating
        //GET https://{{baseUrl}}/api/recommended?genre=horror
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
        

        public IActionResult Index()
        {
            
            return View();
        }
    }
}
