import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schema/books.schems';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name)
    private bookModel: mongoose.Model<Books>,
  ) {}

  async addBook(book: Books): Promise<Books> {
    book.id = uuidv4();
    const res = await this.bookModel.create(book);
    return res;
  }

  async getBooks(): Promise<Books[]> {
    const res = await this.bookModel.find();
    return res;
  }

  async getBookById(bookId: string): Promise<Books> {
    const res = await this.bookModel.findOne({ id: bookId });

    if (!res) throw new NotFoundException('Book Not Found :(');

    return res;
  }

  async updateBook(bookId: string, book: Books): Promise<Books> {
    const res = await this.bookModel.findByIdAndUpdate(bookId, book, {
      new: true,
      runValidators: true,
    });
    return res;
  }

  async deleteBook(bookId: string): Promise<string> {
    const res = await this.bookModel.deleteOne({ id: bookId });
    return 'Book Deleted';
  }
}
