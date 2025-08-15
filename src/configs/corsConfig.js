import cors from 'cors'

// cors origin validations
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.PRODUCTION_ORIGIN) {
  console.error('Erro: PRODUCTION_ORIGIN não está definido no ambiente Render.');
  process.exit(1);
}

if (!isProduction && !process.env.LOCAL_ORIGIN) {
  console.warn(
    'Atenção: LOCAL_ORIGIN não está definido. Usando http://localhost:5173 como fallback.'
  );
}

const allowedOrigins = [
  !isProduction ? process.env.LOCAL_ORIGIN || 'http://localhost:5173' : null,
  process.env.PRODUCTION_ORIGIN,
  process.env.PRODUCTION_WORKSPACE_ORIGIN,
].filter(Boolean);

export const corsMiddleware = cors({ origin: allowedOrigins });