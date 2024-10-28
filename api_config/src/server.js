const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config(); // Certifique-se de carregar variáveis de ambiente

// Importar app de outro arquivo
const app = require('./app');

// Definir a porta, ou buscar do arquivo .env
const port = process.env.PORT || 3008; // Aqui a porta é definida corretamente

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação de API',
      version: '1.0.0',
      description: 'Documentação de API',
    },
    servers: [
      {
        url: `http://localhost:${port}`, // Usando a variável port corretamente
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`], // Caminho para os arquivos de rotas
};

// Gerar a documentação do Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Rota para a interface do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Iniciar o servidor
app.listen(port, () => console.log(`Rodando na porta ${port}`));
