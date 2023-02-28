var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { BookDTO } from './BookDTO';
let BookDTOService = class BookDTOService {
    constructor(http, _sanitizer) {
        this.http = http;
        this._sanitizer = _sanitizer;
        this.url = "/api/products";
        this.ar = [
            new BookDTO(0, "someTitle", "someAuthor", 4, 3),
            new BookDTO(1, "anotherTitle", "anotherAuthor", 3, 0),
            new BookDTO(2, "someTitle1", "someAuthor1", 1, 1),
            new BookDTO(3, "anotherTitle1", "anotherAuthor1", 3, 1)
        ];
        this.lastId = 4;
    }
    getBooks(recommendMode) {
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
    bookCoverConvert(b) {
        if (b.Cover == null) {
            b.CoverPath = "img/cover.jpg";
            return;
        }
        b.CoverPath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + b.Cover);
    }
    getBook(id) {
        alert("trying to get this book"); //not done
        return this.http.get(this.url + '/' + id);
    }
    createBook(book, recommendMode) {
        book.Id = this.lastId;
        this.lastId++;
        this.ar.push(book);
        return this.getBooks(recommendMode);
    }
    updateBook(book, recommendMode) {
        for (let i = 0; i < this.ar.length; ++i) {
            if (this.ar[i].Id == book.Id) {
                this.ar[i] = book;
            }
        }
        return this.getBooks(recommendMode);
    }
    deleteBook(id, recommendMode) {
        delete this.ar[id];
        return this.getBooks(recommendMode);
    }
};
BookDTOService = __decorate([
    Injectable()
], BookDTOService);
export { BookDTOService };
//# sourceMappingURL=BookDTO.service.js.map