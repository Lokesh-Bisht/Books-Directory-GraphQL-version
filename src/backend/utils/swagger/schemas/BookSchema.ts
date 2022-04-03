/**
 * @swagger
 *  components:
 *    schemas:
 *      AddBook:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - coverImage
 *        properties:
 *          id:   
 *            type: number
 *            description: The auto-generated id of the book
 *          title:
 *            type: string
 *            description: The book title
 *          description:
 *            type: string
 *            description: The book description/summary
 *          coverImage:
 *            type: string
 *            description: A URL for the book cover image
 *        example:
 *          title: The New Turing Omnibus
 *          description: Alexander K. Dewdney
 *          coverImage: https://www.amazon.com/image/the_new_turing-ombinus.png
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      AddBookResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: true
 *          msg: Book added
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      AddBookErrorResponse400:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Incomplete info. Failed to add this book.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      AddBookErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Encountered an error while adding this book. Please, try again.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBook:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - coverImage
 *        properties:
 *          title:
 *            type: string
 *            description: The book title
 *          description:
 *            type: string
 *            description: The book description/summary
 *          coverImage:
 *            type: string
 *            description: A URL for the book cover image
 *        example:
 *          title: The New Turing Omnibus
 *          description: Alexander K. Dewdney
 *          coverImage: https://www.amazon.com/image/the_new_turing-ombinus.png
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBookResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: true
 *          msg: Book updated
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBookErrorResponse400:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Update failed. Incomplete info.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBookErrorResponse404:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Failed to edit book with id 89254.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBookErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Encountered an error while editing this book. Please, try again.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      DeleteBookResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: true
 *          msg: Book deleted
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      DeleteBookErrorResponse404:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Failed to delete book with id 89254.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      DeleteBookErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Encountered an error while deleting this book. Please, try again.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetAllBooksResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *          books:
 *            type: array
 *            descritption: An array of book objects.
 *        example:
 *          success: true
 *          msg: Successful in fetcing all the books.
 *          books: [ {title: , description: , coverImage: }, 
 *                   {title: , description: , coverImage: } ]
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetAllBooksErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Encountered an error while fetching the books.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetAllBooksForUserResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *          books:
 *            type: array
 *            description: An array of book objects.
 *        example:
 *          success: true
 *          msg: Successful in fetcing all the books for the user.
 *          books: [ {title: , description: , coverImage: }, 
 *                   {title: , description: , coverImage: } ]
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetAllBooksForUserErrorResponse404:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Failed to find books for the user 45
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetAllBooksForUserErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          msg: Encountered an error while fetching the books.
 */