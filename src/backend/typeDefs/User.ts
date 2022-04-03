import { gql } from "apollo-server-express"


export const UserTypeDefs = gql`

  input User {
    username: String,
    email: String,
    password: String
  }

  type UserInfo {
    username: String
    email: String
  }

  input loginCredentials {
    username: String,
    password: String
  }

  type FetchUserInfoResponse {
    success: Boolean
    user: UserInfo
    msg: String
  }

  type UserResponse {
    success: Boolean!,
    status: String!,
    user: String,
    msg: String!,
    accessToken: String
  }

  type Query {
    fetchUserInfo(userID: String) : FetchUserInfoResponse
  }

  type Mutation {
    registerUser(user: User) : UserResponse
    login(user: loginCredentials) : UserResponse  
  }
`;