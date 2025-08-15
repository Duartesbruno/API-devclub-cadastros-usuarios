import express from 'express';
import { corsMiddleware } from './configs/corsConfig.js';
import usuariosRoutes from './routes/usuarios.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/usuarios', usuariosRoutes);

export default app;