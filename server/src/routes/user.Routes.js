import { deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controller/user.Controller.js";
import express from "express";

const router = express.Router();

router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;
