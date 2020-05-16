//Importamos express
const express = require('express');
//Importamos las variables de entorno
require('dotenv').config({path: 'variables.env'});
//Importamos cors-anywhere
const cors_proxy = require('cors-anywhere');

//Creamos el servidor express
const app = express();

//Asignamos host
const host = process.env.HOST || '0.0.0.0';
//Asignamos port
const port = process.env.PORT || 4000;

const proxy = cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'] 
});

app.get('/proxy/:proxyUrl*', (req, res) => {
    req.url = req.url.replace('/proxy/', '/');
    proxy.emit('request', req, res);
});

//Asignamos puerto y arrancamos el servidor
app.listen(port, host, () => {
    console.log(`Servidor express cors-anywhere iniciado en ${host} : ${port}`);
});