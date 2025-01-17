import express from "express"
import connectMongoDb from "./config/dbConnect.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config({path : "server/config/config.env"})
const app = express()
const PORT =  process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
import authRoute from "./route/authRoute.js"
import blogRoute from "./route/blogRoute.js"
app.use("/api/v2", authRoute)
app.use("/api/v2", blogRoute)
app.listen(PORT,()=>{
    connectMongoDb()
    console.log(`server  is listening on port : ${PORT}`);
})