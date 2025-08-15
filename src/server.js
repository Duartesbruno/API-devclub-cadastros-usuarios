import app from './app.js';

const PORT = process.env.PORT || 3000;
const portNumber = parseInt(PORT, 10);

if (!PORT || isNaN(portNumber) || portNumber <= 0) {
  console.error('Erro: PORT inválida.');
  process.exit(1);
}

app.listen(portNumber, () => {
  console.log(`Servidor rodando na porta ${portNumber}`);
});