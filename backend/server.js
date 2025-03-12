import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import path from 'path';
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";

// app config

const app = express();
const port = process.env.PORT || 10000;

const __dirname = path.resolve();

// middleware

app.use(express.json());
app.use(cors());

// db connect

connectDB();

// api endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.use(express.static(path.join(__dirname, "/admin/dist")));

    app.get("/admin/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "admin", "dist", "index.html"));
    })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.get("/",(req, res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})