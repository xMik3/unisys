import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve relative to this module, not the cwd: the same code has to work
// from the package root under tsx and from dist/ under `node dist/server.js`.
const here = path.dirname(fileURLToPath(import.meta.url));

// routes/ is compiled into dist/, so it is always a sibling. docs/ is not
// compiled, so it sits beside this file in dev but one level up from dist/.
const docsDir = [path.join(here, "docs"), path.join(here, "..", "docs")]
  .find(candidate => fs.existsSync(path.join(candidate, "swaggerDescription.md")));

if (!docsDir) throw new Error("swagger: could not locate docs/swaggerDescription.md");

const options = {
  definition: {
    openapi: '3.0.3',
    info: {title: 'UniSys API', version: '1.4.0', description: fs.readFileSync(path.join(docsDir, "swaggerDescription.md"), "utf-8")},
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
  // Both extensions: .ts once the routes are ported, .js until then. tsc
  // preserves the JSDoc blocks into dist/, so the compiled output still works.
  apis: [path.join(here, "routes/*.js"), path.join(here, "routes/*.ts")],
};

export default swaggerJsdoc(options);