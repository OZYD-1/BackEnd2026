import { registerController } from "../controller/auth.Controller.js";
import express from "express";

const router = express.Router();

router.post("/auth/register", registerController);
 

export default router;
