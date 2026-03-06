import dotenv from "dotenv";
import connecTDB from "./src/config/db.js";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js"

dotenv.config()

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

connecTDB()

app.use("/api", userRoutes)


app.get("/", (req, res) => {
    res.send("hello world")
})
app.listen(port, () => {
    console.log("server is running on port " + port);
})