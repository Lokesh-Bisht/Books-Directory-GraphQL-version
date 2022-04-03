import dotenv from "dotenv"
import express from "express";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { UserTypeDefs } from "./typeDefs/User";
import { UserResolver } from "./resolvers/UserResolver";
import swaggerDocs from "./utils/swagger/swagger"
import { ApolloServer, gql }  from "apollo-server-express"
import { BookTypeDefs } from "./typeDefs/Book";
import { BookResolver } from "./resolvers/BookResolver";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE


createConnection().then(async () => {
  const apolloServer = new ApolloServer({
    typeDefs: [UserTypeDefs, BookTypeDefs],
    resolvers: [new UserResolver().UserQueryAndMutations,
    new BookResolver().BookQueryAndMutations],
    context({ req, res }) {
      return { req, res }
    },
        
       
  });

  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3000/register'],
    credentials: true,
    optionsSuccessStatus: 200 
  }

  await apolloServer.start();

  apolloServer.applyMiddleware( { app: app, cors: corsOptions });

  swaggerDocs(app, Number(port));

  app.listen(port, () => {
    console.log('Sever running on port 8080');
  });

}).catch(error => console.log(error));