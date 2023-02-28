var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { BookDTOService } from './BookDTO.service';
import { BookDTO } from './BookDTO';
let AppComponent = class AppComponent {
    constructor(dataService, modalService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.book = new BookDTO(); // изменяемый товар
        this.recommendMode = false;
        this.tableMode = true;
        this.addMode = true; // табличный режим
        this.addModeTitle = "Add book";
        this.cover = "";
    }
    ngOnInit() {
        this.loadBooks();
    }
    onFileChange(event) {
        var img = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
            this.book.Cover = (reader.result).toString();
        };
    }
    recommend(mode) {
        this.recommendMode = mode;
        this.loadBooks();
    }
    loadBooks() {
        this.books = this.dataService.getBooks(this.recommendMode);
    }
    // сохранение данных
    save() {
        if (this.book.Id == null) {
            this.books = this.dataService.createBook(this.book, this.recommendMode);
        }
        else {
            this.books = this.dataService.updateBook(this.book, this.recommendMode);
        }
        this.cancel();
    }
    editProduct(p) {
        this.book = p;
    }
    cancel() {
        this.book = new BookDTO();
        this.tableMode = true;
    }
    delete(p, recommendMode) {
        this.books = this.dataService.deleteBook(p.Id, this.recommendMode);
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
    openModal(id) {
        this.modalService.open(id);
    }
    closeModal(id) {
        this.modalService.close(id);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        styleUrls: ['./styles.css'],
        providers: [BookDTOService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map