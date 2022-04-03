import { BooksRepository } from "../repository/BooksRepository";
import { Authorization } from "../utils/Authorizartion";

/**
 * A class for processing user requests like add, update and delete book.
 * And for fetching all books or books associated with a user.
 */
export class BookResolver {
  private bookRepo: BooksRepository;
  private auth: Authorization;

  constructor() {
    this.bookRepo = new BooksRepository();
    this.auth = new Authorization();
  }


  BookQueryAndMutations = {
    Query: {
      // Get all Books
      getAllBooks: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }

        const result = await this.bookRepo.fetchAllBooks(req);
        try {
          if (result !== undefined) {
            return {
              success: true, 
              msg: 'Successful in fetcing all the books.',
              books: result 
            };
          } else {
            return {
              sucess: false, 
              msg: 'Failed while fetching the books.', 
            };
          }
        } catch (error) {
          return {
            success: false,
            msg: 'Encountered an error while fetching the books.'
          };
        }
      },

      // Get all books for a user with userID
      getAllBooksOwnedByUser: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }

        const userID = args.id;
        const result = await this.bookRepo.getAllBooksWithUserID(userID);
        try {
          if (result === undefined) {
            return {
              success: false, 
              msg: `Failed to find books for the user: ${userID}`
            };
          } else {
            return {
              success: true, 
              msg: 'Successful in fetcing all the books for the user.',
              books: result
            };
          }
        } catch (error) {
          return {
            success: false,
            msg: 'Encountered an error while fetching the books.'
          };
        }
      },

      // Get a book with ID for a user with userID
      getBookByUser: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }
        
        const userID = args.userID;
        const bookID = Number(args.bookID);

        const result = await this.bookRepo.getBookWithUserID(userID, bookID);
        try {
          if (result === undefined) {
            return { 
              success: false, 
              msg: `Failed to find book ${bookID} for user ${userID}` 
            };
          } else {
            return { 
              success: true, 
              msg: 'Successful in fetcing the book.',
              books: result
            };
          }
        } catch(error) {
          return {
            success: false,
            msg: 'Encountered an error while fetching the books.'
          };
        }
      }
    },


    Mutation: {
      // Update a book
      updateBook: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }
        
        const { title, description, coverImage } = args.book;

        // If title, summary or coverImage is null
        if (!title || !description || !coverImage) {
          return {
            success: false, 
            msg: 'Update failed. Incomplete info.'
          };
        }

        const result: any = await this.bookRepo.updateBook(args.bookID, args.book);
        try {
          if (result.affected === 0) {
            return {
              success: false, 
              msg: `Failed to edit book with id: ${args.bookID}`
            };
          } else {
            return { 
              success: true, 
              msg: 'Book updated' 
            };
          }
        } catch(error) {
          return {
            sucess: false,
            msg: 'Encountered an error while editing this book. Please, try again.' 
          };  
        }
      },

      // Add a book
      addBook: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }
        
        const { title, description, coverImage } = args.book;

        // If userID, title, summary or coverImage is null
        if (!title || !description || !coverImage || !args.userID) {
          return {
            success: false, 
            msg: 'Incomplete info. Failed to add this book.'
          };
        }  

        const restult = await this.bookRepo.addNewBook(args.userID, args.book);
        try {
          return { 
            success: true, 
            msg: 'Book added' 
          };
        } catch(error) {
          return {
            success: false, 
            msg: 'Encountered an error while adding this book. Please, try again.' 
          }; 
        }
      },

      // Delete a book
      deleteBook:  async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          };
        }
        
        const bookID = parseInt(args.bookID);
        const result: any = await this.bookRepo.deleteBook(bookID);
        try {
          if (result.affected === 0) {
            return {
              success: false, 
              msg: `Failed to delete book for id: ${bookID}`
            };
          } else {
            return { 
              success: true, 
              msg: 'Book deleted' 
            };
          }
        } catch(error) { 
          return {
            sucess: false,
            msg: 'Encountered an error while deleting this book. Please, try again.' 
          };
        }
      }
    }
  }
}