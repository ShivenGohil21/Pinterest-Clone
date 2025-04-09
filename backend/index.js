import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';  
import { v2 as cloudinary } from 'cloudinary';  // Correct import

import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoute.js';

dotenv.config();

cloudinary.config({  // Correct syntax
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
});

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});
