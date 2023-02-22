using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task2.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
       
        public string Cover { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Genre {get; set;}
        public List<Review> Reviews { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
