import dotenv from "dotenv";
import connecTDB from "./src/config/db.js";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js"
import authRoutes from "./src/routes/auth.Routes.js"
import { connectMongo } from "./src/config/db_Mongo.js";
import categoriesRoutes from "./src/routes/categories.Routes.js";
dotenv.config()

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
//http://localhost:3000/api
connecTDB()
// connectMongo()

app.use("/api", userRoutes)
app.use("/api", authRoutes)
app.use("/api", categoriesRoutes)

app.get("/", (req, res) => {
    res.send("hello world")
})
app.listen(port, () => {
    console.log("server is running on port " + port);
})