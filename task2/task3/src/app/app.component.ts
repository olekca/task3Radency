import { Component, OnInit } from '@angular/core';
import { BookDTOService } from './BookDTO.service';
import { BookDTO } from './BookDTO';
import { ModalService } from './_modal';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./styles.css'],
    providers: [BookDTOService]
})
export class AppComponent implements OnInit {

    book: BookDTO = new BookDTO();   // изменяемый товар
    books: BookDTO[];                // массив товаров
    recommendMode: boolean = false;
    tableMode: boolean = true;
    addMode: boolean = true;// табличный режим
    addModeTitle: string = "Add book";
    cover: string = "";


    constructor(private dataService: BookDTOService, private modalService: ModalService) { }

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
    recommend(mode: boolean) {
        this.recommendMode = mode;
        this.loadBooks();
    }
    
    loadBooks() {//i.Show All or Recommended list 

        this.books = this.dataService.getBooks(this.recommendMode) as BookDTO[];
    }
    // сохранение данных
    save() {
        if (this.book.Id == null) {
            this.books = this.dataService.createBook(this.book, this.recommendMode) as BookDTO[]
        } else {
            this.books = this.dataService.updateBook(this.book, this.recommendMode) as BookDTO[];
        }
        this.clean();
    }
    editProduct(p: BookDTO) {
        this.book = p;
        this.addModeTitle = "Edit book";
    }
    clean() {
        this.book = new BookDTO();
        this.tableMode = true;
    }
    delete(p: BookDTO, recommendMode) {
        this.books = this.dataService.deleteBook(p.Id, this.recommendMode) as BookDTO[];
    }
    add() {
        this.clean();
        this.tableMode = false;
    }


    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
}