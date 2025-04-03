const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));


app.get('/api/compras', async (req, res) => {
  try {
  
    const limite = parseInt(req.query.limite) || 5000;

    
    if (isNaN(limite) || limite <= 0) {
      return res.status(400).json({ error: 'Limite inválido. Informe um valor numérico maior que zero.' });
    }

    
    const response = await axios.get('https://dados.tcerj.tc.br/api/v1/compras_diretas_municipio', {
      params: {
        inicio: 0,
        limite: limite,
        csv: false,
        jsonfull: false
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a API do TCERJ' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
