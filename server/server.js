import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js' 
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'    // ← yaha move kiya, import syntax mein
import commentRoutes from './routes/commentRoutes.js'

const app = express();
const port = process.env.PORT || 4000
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// API Endpoints
app.get('/', (req, res)=> res.send("API Working "));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, ()=> console.log(`server started on PORT:${port}`));