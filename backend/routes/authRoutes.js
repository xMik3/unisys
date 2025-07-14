import express from "express";

import {validateLoginInput} from "../middleware/inputValidation.js";
import {loginController} from "../controllers/authControllers.js";

const router = express.Router();
router.post("/login", validateLoginInput, loginController);

export default router;
