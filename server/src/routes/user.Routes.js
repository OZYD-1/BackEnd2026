import { getAllUsersController } from "../controller/user.Controller.js";
import express from "express"

const router = express.Router()

    router.get("/users", getAllUsersController)


export default router