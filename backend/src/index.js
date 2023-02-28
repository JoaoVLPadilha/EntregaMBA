// Ajuda principalmente na criação das rotas da aplicação.
const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

const app = express();

// Fazer o express entender Json
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(errors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/test', (_, res) => {
   return res.send('Hello Word!');
});

// Definindo a porta usada no localhost
app.listen(3333);
