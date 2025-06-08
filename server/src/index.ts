import './config/firebaseAdmin';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import bitacoraRoutes from './routes/bitacora.routes';
import { PORT } from './config/env';

import dotenv from "dotenv";
import newsRoutes from "./routes/news.routes";


const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bitacora', bitacoraRoutes); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});