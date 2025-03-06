import express from 'express';
import dotenv from 'dotenv'; // ✅ Fixed import
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
import { errorHandler } from "./_middleware/error-handler"; 




dotenv.config(); // Load environment variables

if (!process.env.PORT) {
    console.error(' PORT not specified in .env');
    process.exit(1);
}

const port = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
