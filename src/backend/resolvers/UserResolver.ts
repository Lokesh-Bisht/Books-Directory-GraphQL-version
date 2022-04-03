import { UsersRepository } from "../repository/UsersRepository";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { Authorization } from "../utils/Authorizartion";

/**
 * A class for processing user requests like user registration, login, 
 * and user info fetching. 
 */
export class UserResolver {
  
  private userRepo: UsersRepository;
  private auth: Authorization

  constructor() {
    this.userRepo = new UsersRepository();
    this.auth = new Authorization();
  }

  /**
   *  Returns true if the password passed by the user is the same as the
   *  password stored in the database
   */
  private async comparePasswordHash(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  // Checks if email is available
  private async checkEmail(email: string) : Promise<boolean> {
    const doesEmailExist = await this.userRepo.checkIfEmailExists(email);
    try {
      if (doesEmailExist === undefined) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Checks if username is available
  private async checkUsername(username: string) : Promise<boolean> {
    const doesUsernameExist = await this.userRepo.checkIfUsernameExists(username)
    try {
      if (doesUsernameExist === undefined) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Generate token for Authorization
  private async generateAuthToken(id: number, username: string) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
    const accessToken = Jwt.sign({}, accessTokenSecret);
    return accessToken;
  }

  UserQueryAndMutations = {
    Query: {
      fetchUserInfo: async(_: any, args: any, { req }: any) => {
        // Invalid or no access token
        if (this.auth.authenticateToken(req) === false) {
          return {
            success: false,
            msg: 'User is not logged in.'
          }
        }

        const userID = args.userID;
        const result = await this.userRepo.getUserById(userID);
        try {
          if (result !== undefined) {
            return {
              success: true,
              user: result,
              msg: 'User info success'
            };
          }
        } catch (error) {
          return {
            success: false,
            msg: 'Failed to fetch user info'
          }
        }
      }
    },

    Mutation: {
      /**
       * Check if username and email address are available.
       * 
       * Hash the password before saving it into the database.
       * 
       * Save the user info into the users table in the database.
       * 
       * Generate an access token for authorization.
       * 
       * Set access token and user id as cookies in the client's browser.
       */
      registerUser: async(_: any, args: any, { res }: any) => {
        const user = args.user;
        if (!user.username || !user.email || !user.password) {
          return { 
            success: false, 
            status: "Registration failed",
            msg: "Username, email and password can't be empty."
          }
        }

        // Check if email is available
        const doesEmailExist = await this.checkEmail(user.email);
        if (doesEmailExist) {
          return {
            success: false,
            status: 'Registration failed', 
            msg: "An account with this email address is already registered."
          }
        }

        // Check if username is available
        const doesUsernameExist = await this.checkUsername(user.username);
        if (doesUsernameExist) {
          return {
            success: false,
            status: 'Registration failed', 
            msg: "This username is not available.",
          };
        }

        // Hash password
        try {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        } catch(error) {
          return {
            success: false,
            status: 'Registration failed',
            msg: 'Failed to register user. Please, try again later.'
          };
        }

        // Add user into the users table
        const result: any = await this.userRepo.addUser(user);
        try {
          if (result !== undefined) {
            // console.log("userID = ", result.generatedMaps[0].userID);
            const userID = result.generatedMaps[0].userID;
            const accessToken = await this.generateAuthToken(userID, 
              user.username);

            res.cookie('Authorization', accessToken);
            res.cookie('id', userID);

            return { 
              success: true,
              status: 'User Registered.',
              user: user.username, 
              msg: 'User is registered successfully.', 
              accessToken: accessToken 
            };
          } 
        } catch(error) { 
          return {
            sucess: false,
            status: 'Registration failed',
            msg: 'Failed to register user. Please, try again later.' 
          };
        }
      },
    
    
      /**
       * User Login: 
       * Check if the user credentials are not empty.
       * 
       * Check the user credentials passed by the user against the one's
       * stored in the database
       * 
       * If they do not match then return 'Authentication failed' status.
       * 
       * If they do, then generate an access token. Set the access token
       * and user id as cookies in the client's browser.
       * 
       * Return 'Authentication successful' status.
       */
      login: async(_: any, args: any, { res }: any) => {
        const user = args.user;
        
        // Check if the user info passed is not empty
        if ((!user.username || !user.password)) {
          return { 
            success: false,
            status: 'Authentication failed',
            msg: "Username and password can't be empty."
          };
        }
    
    
        const result: any = await this.userRepo.findUser(user);
        try {
          // User name is matched
          if (result !== undefined) {
            // Compare passwords
            if (await this.comparePasswordHash(user.password, 
              result.password) === true) {
                
              // User login credentials are valid. Generate auth token
              const accessToken = await this.generateAuthToken(result.userID, 
                result.username);

              res.cookie('Authorization', accessToken);
              res.cookie('id', result.userID);
    
              return { 
                success: true,
                status: 'Authentication successful',
                user: result.username,
                msg: 'Login successful',
                accessToken: accessToken
              };
            
            } else {
              return { 
                success: false,
                status: 'Authentication failed',
                msg: 'Incorrect username or password.'
              };
            }
          } else {
            
            return {
              success: false,
              status: 'Authentication failed',
              msg: 'Incorrect username or password.'
            };
          }
        } catch (error) {
          return {
            success: false,
            status: 'Authentication failed', 
            msg: 'An error has occurred while logging in. Please, try again.'
          };
        }
      },
    }
  };
}