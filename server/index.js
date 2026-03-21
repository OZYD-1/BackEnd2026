import dotenv from "dotenv";
import connecTDB from "./src/config/db.js";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js"
import authRoutes from "./src/routes/auth.Routes.js"
import { connectMongo } from "./src/config/db_Mongo.js";
import categoriesRoutes from "./src/routes/categories.Routes.js";
import cors from "cors";
dotenv.config()

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
}))
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