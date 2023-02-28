import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookDTO } from './BookDTO';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BookDTOService {

    private url = "/api/products";
    private ar: BookDTO[] = [
        new BookDTO(0, "someTitle", "someAuthor", 4, 3),
        new BookDTO(1, "anotherTitle", "anotherAuthor", 3, 0),
        new BookDTO(2, "someTitle1", "someAuthor1", 1, 1),
        new BookDTO(3, "anotherTitle1", "anotherAuthor1", 3, 1)
    ];
    private lastId: number = 4;
        

    constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {
    }

    getBooks(recommendMode: boolean) {
        this.booksCoverConvert();
        if (recommendMode == true) {
            return this.ar.slice().reverse();
        }
        else {
            return this.ar;
        }
        
      
    }

    booksCoverConvert() {
        for (let i = 0; i < this.ar.length; ++i) {
            this.bookCoverConvert(this.ar[i]);
        }
    }

    bookCoverConvert(b: BookDTO) {
        if (b.Cover == null) {
            b.CoverPath = "img/cover.jpg";
            return;
        }
        b.CoverPath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + b.Cover);
    }

    getBook(id: number) {
        alert("trying to get this book");//not done
        return this.http.get(this.url + '/' + id);
        
    }

    createBook(book: BookDTO, recommendMode: boolean) {
        book.Id = this.lastId;
        this.lastId++;
        this.ar.push(book);
        return this.getBooks(recommendMode);
    }
    updateBook(book: BookDTO, recommendMode: boolean) {
        for (let i = 0; i < this.ar.length; ++i) {
            if (this.ar[i].Id == book.Id) {
                this.ar[i] = book;
            }
        }
        return this.getBooks(recommendMode);
    }

    deleteBook(id: number, recommendMode: boolean) {
        delete this.ar[id];
        return this.getBooks(recommendMode);
    }
}