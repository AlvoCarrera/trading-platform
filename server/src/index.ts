import './config/firebaseAdmin';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import bitacoraRoutes from './routes/bitacora.routes'; 
import { PORT } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/bitacora', bitacoraRoutes); 

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});