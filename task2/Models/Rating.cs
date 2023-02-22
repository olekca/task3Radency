using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task2.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
