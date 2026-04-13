import express from "express"
import { config } from "dotenv"
import { connectDB,disconnectDB } from "./config/db.js"
import authroute from "./route/authroute.js"

config()
connectDB()
const app = express()
app.use(express.json())
app.use("/api",authroute)
app.get("/api/hello",(req,res)=>{
res.json({m:"rice"})
})
const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`message ${port}`)
})