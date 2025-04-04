import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import path from 'path';
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";
import router from "./routes/settingRoute.js";

// app config

const app = express();
const port = process.env.PORT || 10000;

const __dirname = path.resolve();

// middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// db connect

connectDB();

// api endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use('/uploads', express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use('/api', router)

if(process.env.NODE_ENV === 'production'){
    const projectRoot = path.join(__dirname, '..'); // '..' goes up one directory level

    // Serve static files from the frontend build directory
    app.use(express.static(path.join(projectRoot, 'frontend', 'dist')));

    // Serve static files from the admin build directory
    // Note: If frontend and admin have files with the same name (e.g., assets),
    // you might need to namespace the admin static path, e.g.,
    // app.use('/admin-assets', express.static(path.join(projectRoot, 'admin', 'dist')));
    // But for index.html serving, the current approach might be okay depending on exact needs.
    // Let's stick to your original structure for now:
    app.use(express.static(path.join(projectRoot, 'admin', 'dist')));

    // Handle requests to /admin/* by serving the admin index.html
    // This route needs to come BEFORE the general '*' catch-all
    app.get("/admin/*", (req, res) => {
        res.sendFile(path.resolve(projectRoot, "admin", "dist", "index.html"));
    })

    // Handle all other non-API GET requests by serving the frontend index.html
    // This acts as a catch-all for client-side routing in the frontend app
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(projectRoot, "frontend", "dist", "index.html"));
    })
}

app.get("/",(req, res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})