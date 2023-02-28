import { SafeResourceUrl } from "@angular/platform-browser";

export class BookDTO {
    constructor(
        public Id?: number,
        public Title?: string,
        public Author?: string,
        public Rating?: number,
        public ReviewsNumber?: number,
       public Genre?: string,
        public Cover?: string,
        public Content?: string,
        public CoverPath?: SafeResourceUrl
        ) { }
}