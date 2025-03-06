import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
import { errorHandler } from "./_middleware/error-handler";
import usersController from './users/users.controller'; // ✅ Import instead of require

dotenv.config(); // Load environment variables

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000; // ✅ Provide a default value
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(errorHandler);

// API Routes
app.use('/users', usersController); // ✅ Importing it properly

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
