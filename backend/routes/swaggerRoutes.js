import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";

const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/docs.json', (req, res) => res.json(swaggerSpec));

export default router;