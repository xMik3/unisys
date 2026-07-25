import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";

const options = {
  definition: {
    openapi: '3.0.3',
    info: {title: 'UniSys API', version: '1.4.0', description: fs.readFileSync("./docs/swaggerDescription.md","utf-8")},
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags:[
        {name: "Auth"},
        {name: "Student"},
        {name: "Teacher"},
        {name: "Secretary - Course Management"},
        {name: "Secretary - Student Management"},
        {name: "Secretary - Teacher Management"}
    ],
    security: [{bearerAuth: []}],
  },
  apis: ['./routes/*.js'],
};

export default swaggerJsdoc(options);