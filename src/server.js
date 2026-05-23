require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

require('./models/Categoria');
require('./models/Transacao');

const categoriaRoutes = require('./routes/categoriaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/categorias', categoriaRoutes);
app.use('/transacoes', transacaoRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Controle Financeiro funcionando!' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Banco de dados sincronizado!`);
    });
  })
  .catch(err => console.error('Erro ao conectar no banco:', err));