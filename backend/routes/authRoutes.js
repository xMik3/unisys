import express from "express";

import {validateLoginInput} from "../middleware/inputValidation.js";
import {login} from "../controllers/authControllers.js";

const router = express.Router();
router.post("/login", validateLoginInput, login);

export default router;
