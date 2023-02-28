export class Book {
    constructor(
        public Id?: number,
        public Title?: string,
        public Author?: string,
        public Genre?: string,
        public Cover?:string,
        public Rating?: number,
        public ReviewsNumber?: number) { }
    /*
       
        
        public string Content { get; set; }       
        
        public List<Review> Reviews { get; set; }
        public List<Rating> Ratings { get; set; }*/
}