import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './schema/books.schems';
import { AddBookDto } from './dto/addbook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post('/add')
  async addBook(@Body() book: AddBookDto): Promise<Books> {
    return this.bookService.addBook(book);
  }

  @Get('/getbookbyid/:id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Books> {
    return this.bookService.getBookById(id);
  }

  @Get('/getbooks')
  async getBooks(): Promise<Books[]> {
    return this.bookService.getBooks();
  }

  @Patch('/updatebook/:id')
  async updateBook(
    @Param('id')
    id: string,

    @Body()
    book: UpdateBookDto,
  ): Promise<Books> {
    return this.bookService.updateBook(id, book);
  }
  @Delete('/delbook/:id')
  delBook(
    @Param('id')
    id,
  ): Promise<string> {
    return this.bookService.deleteBook(id);
  }
}
