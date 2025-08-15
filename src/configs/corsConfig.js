import cors from 'cors'

// cors origin validations
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction
  ? [process.env.PRODUCTION_ORIGIN]
  : [process.env.LOCAL_ORIGIN || 'http://localhost:5173', process.env.PRODUCTION_ORIGIN].filter(Boolean);

if (isProduction && !process.env.PRODUCTION_ORIGIN) {
  console.error('Erro: PRODUCTION_ORIGIN não está definido no ambiente Render.');
  process.exit(1);
}

export const corsMiddleware = cors({ origin: allowedOrigins });