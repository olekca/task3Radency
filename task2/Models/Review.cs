using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task2.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public string Reviewer { get; set; }
    }
}
