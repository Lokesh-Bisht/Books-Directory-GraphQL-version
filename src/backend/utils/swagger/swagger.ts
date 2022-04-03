import { Express, Request, Response } from "express"
import swaggerJSdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options: swaggerJSdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API docs",
      version: "1.0.0",
      description: "Book Directory REST API docs",
    }, 
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          in: "header"
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      }
    ],
  },
  apis: ["src/backend/utils/swagger/schemas/*.ts"],
};

const swaggerSpec = swaggerJSdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swgger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  })

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;