
const express = require('express');
const app = express();
const booksRoute = require('./route/livroRoute');
const cidadesRoute = require('./route/cidadeRoute');
const clientesRoute = require('./route/clienteRoute');
const ufsRoute = require('./route/ufsRoute');
const enderecosRoute = require('./route/enderecoRoute');
const cors = require('cors');

// Documentação automática
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Express para Server',
        version: '1.0.0',
        description:
            'Este é um aplicativo REST API feito com Express. Server',
        license: {
            name: 'Licenciado para SENAI',
            url: 'https://cursos.sesisenai.org.br/blumenau',
        },
        contact: {
            name: 'Server',
            url: 'https://cursos.sesisenai.org.br/blumenau',
        },
    },
    servers: [
        {
            url: 'http://localhost:3388',
            description: 'Servidor de desenvolvimento',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./route/*.js']
};

//const swaggerSpec = swaggerJSDoc(options);
//const swaggerFile = require('./swagger_output.json');
//const swaggerAutogen = require('swagger-autogen')();
//const endpointsFiles = ['./route/citys/citysRoute.js'];

app.use(express.json());
app.use(cors());
app.use(booksRoute);
app.use(cidadesRoute);
app.use(clientesRoute);
app.use(ufsRoute);
app.use(enderecosRoute);
app.listen(3388);

//swaggerAutogen(swaggerFile, endpointsFiles);

//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
