import Jwt from "jsonwebtoken"

export class Authorization {
  
  /**
   * This method validates access token sent by the client.
   * 
   * It first checks if the request sent by the client contains 
   * cookies in its header or not.
   * 
   * If yes, then check if the Cookies has a Cookie called 
   * 'Authorization'.
   * 
   * Retrieve the access token associated with the 'Authorization' cookie
   * and check if it is a valid token.
   */
   public authenticateToken(req: any) {

    const authHeader = req.headers.cookie;

    if (authHeader === undefined) {
      return false;
    }

    const cookies: string[] = authHeader?.split(';')
    const cookiesMap: Map<string, string> = new Map();
    cookies.forEach(cookie => {
      const keyValue = cookie.split('=');

      // .replace(/ /g, '');  => to remove spaces from the string
      cookiesMap.set(keyValue[0].replace(/ /g,''), keyValue[1]);
    });


    const token: string | undefined = cookiesMap.get('Authorization');

    if (token === undefined) {
      return false
    }

    // Verify the token
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, 
      (error:any, user:any) => {
        if (error)  {
          return false;
        }
        return true;
      })
  }

}