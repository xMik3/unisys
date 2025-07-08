import express from "express";

import {validateLoginInputs} from "../middleware/inputValidation.js";
import {login} from "../controllers/authControllers.js";

const router = express.Router();
router.post("/login", validateLoginInputs, login);

export default router;
