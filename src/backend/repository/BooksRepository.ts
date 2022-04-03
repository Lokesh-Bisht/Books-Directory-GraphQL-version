import { Book } from "../entity/Book";
import { getRepository, getConnection } from "typeorm";
import { Request } from "express";


/**
 * Class for interacting with the Books table in the database.
 * 
 * This class makes use of Book entity which represents a row in the
 * Books table.
 */
export class BooksRepository {

  /**
   * Fetches all books present in the Books table.
   * @param req 
   * @returns Books, undefined or SQL error
   */
  async fetchAllBooks(req: Request) {
    try {
      return await getRepository(Book)
      .createQueryBuilder("books")
      .getMany();
    } catch (error) {
      return error;
    }
  }

  /**
   * Returns a book from the Books table with book_id === id.
   * @param id 
   * @returns Book, undefined or SQL error
   */
  async getBookById(id: number) {
    try {
      return await getRepository(Book)
      .createQueryBuilder("books")
      .where("books.id = :id", { id : id })
      .getOne();
    } catch (error) {
      return error;
    }
  }


  /**
   * Adds a new book to the books table
   * @param userID 
   * @param book 
   * @returns 
   */
  async addNewBook(userID: string, book: Book) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Book)
      .values([
        { 
          title: book.title,
          description: book.description,
          coverImage: book.coverImage,
          userID: userID
        }
      ])
      .execute();
    } catch(error) {
      return error;
    }
  } 


  /**
   * Updates a book in the Books table
   * @param bookID 
   * @param book 
   * @returns 
   */
  async updateBook(bookID: string, book: Book) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .update(Book)
      .set({
        title: book.title,
        description: book.description,
        coverImage: book.coverImage
      })
      .where("id = :id", { id: bookID })
      .execute();
    } catch(error) {
      return error;
    }
  }


  /**
   * Deletes a book from the Books table
   * @param bookID 
   * @returns 
   */
  async deleteBook(bookID: number) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Book)
      .where("id = :id", { id: bookID })
      .execute();
    } catch(error) {
      return error;
    }
  }


  /**
   * Returns all the books from the Books table which are owned by the 
   * user with user_id === userID
   * 
   * @param userID 
   * @returns Books, undefined or SQL error
   */
  async getAllBooksWithUserID(userID: string) {
    try {
      return await getRepository(Book)
      .createQueryBuilder("books")
      .where("books.userID = :id", { id : userID })
      .getMany();
    } catch (error) {
      return error;
    }
  }


  /**
   * Returns a book with book_id === bookID from the Books table 
   * that is owned by the user with user_id === userID.
   * 
   * @param userID 
   * @param bookID 
   * @returns Book, undefined or SQL error
   */
  async getBookWithUserID(userID: string, bookID: number) {
    try {
      return await getRepository(Book)
      .createQueryBuilder("books")
      .where("books.userID = :userID AND books.id = :bookID", 
      { userID : userID, bookID : bookID})
      .getOne();
    } catch (error) {
      return error;
    }
  }
}

