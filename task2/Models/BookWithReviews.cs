using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task2.Models
{
    public class BookWithReviews
    {
        public int Id;
        public string Title;
        public string Cover;
        public string Content;
        public string Author;
        public decimal Rating;
        public List<ReviewDTO> Reviews;
        


    }
    public class ReviewDTO
    {
        public int Id;
        public string Message;
        public string Reviewer;
    }
}
