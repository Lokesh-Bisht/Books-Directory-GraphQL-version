/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterUser:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *        properties:
 *          id:   
 *            type: string
 *            description: The auto-generated id of the user
 *          username:
 *            type: string
 *            description: The user's username (should be unique)
 *          email:
 *            type: string
 *            description: The user's email address
 *          password:
 *            type: string
 *            description: The user's password
 *        example:
 *          username: oooOOOOooooOOo
 *          email: lokeshbisht@gmail.com
 *          password: Lokesh@123#
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterUserResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *          user: 
 *            type: string
 *            description: username
 *          accessToken:
 *            type: string
 *            description: Access token for authorizing the user request
 *        example:
 *          success: true
 *          status: User registered.
 *          msg: User is registered successfully.
 *          user: {username: oooOOOOooooOOo}
 *          accessToken: eAu823X68mpWoff134AFEFaLXZmq92
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterUserErrorResponse400:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          status: Registration failed
 *          msg: This username is not available.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterUserErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          status: Registration failed
 *          msg: Failed to register user. Please, try again later.
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          description: The user's username
 *        password:
 *          type: string
 *          description: The user's password
 *      example:
 *        username: oooOOOOooooOOo
 *        password: Lokesh@123#
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *          user: 
 *            type: string
 *            description: username
 *          accessToken:
 *            type: string
 *            description: Access token for authorizing the user request
 *        example:
 *          success: true
 *          status: Authentication successful
 *          msg: Login successful.
 *          user: {username: oooOOOOooooOOo}
 *          accessToken: eAu823X68mpWoff134AFEFaLXZmq92
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginErrorResponse403:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          status: Authentication failed
 *          msg: Incorrect username or password.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginErrorResponse500:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          status: 
 *            type: string
 *            description: Status of the request
 *          msg:
 *            type: string
 *            description: Message
 *        example:
 *          success: false
 *          status: Authentication failed
 *          msg: An error has occurred while logging in. Please, try again.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetUserResponse:
 *        type: object
 *        properties:
 *          success: 
 *            type: boolean
 *            description: Tells if the operation is a sucess or a failure
 *          msg:
 *            type: string
 *            description: Message
 *          userData: 
 *            type: object
 *            description: User Data
 *        example:
 *          success: true
 *          msg: Successful in fetching user info.
 *          userData: {username: oooOOOOooooOOo, email: lokeshbisht@gmail.com}
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GetUserErrorResponse500:
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
 *          msg: Failed to fetch user info.
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *      UnauthorizedAccess:
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
 *          msg: Unauthorized access. Please, check if you are logged in.
 */