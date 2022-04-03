import { gql } from "apollo-server-express"


export const BookTypeDefs = gql`

  input Book {
    title: String
    description: String
    coverImage: String
  }

  type BookInfo {
    id: String
    title: String
    description: String
    coverImage: String
  }

  type BookResponse {
    success: Boolean!
    msg: String!
    books: [BookInfo]
  }

  type SingleBookResponse {
    success: Boolean!
    msg: String!
    books: BookInfo
  }

  type Query {
    getAllBooks: BookResponse
    getAllBooksOwnedByUser(id: String) : BookResponse
    getBookByUser(userID: String, bookID: String) : SingleBookResponse
  }

  type Mutation {
    addBook(userID: String, book: Book) : SingleBookResponse
    updateBook(bookID: String, book: Book) : SingleBookResponse
    deleteBook(bookID: String) : SingleBookResponse
  }
`;