const express = require('express');//importando biblioteca Express
const routes = require('./routes');

const server = express();//cria servidor Express

server.use(express.json());
server.use(routes);//adicionando rotas
server.listen(5555);//habilitando porta 3333 para ouvir requisissões 