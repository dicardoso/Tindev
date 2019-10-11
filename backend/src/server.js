const express = require('express');//importando biblioteca Express
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');


const server = express();//cria servidor Express

mongoose.connect('mongodb+srv://diogo:diogo@cluster0-r61bo.mongodb.net/omnistack8?retryWrites=true&w=majority',{
   useNewUrlParser: true
});//conecta com o BD

server.use(cors());//garante que o React pode acessar o Node
server.use(express.json());
server.use(routes);//adicionando rotas
server.listen(5555);//habilitando porta 3333 para ouvir requisissões 