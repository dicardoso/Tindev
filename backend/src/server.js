const express = require('express');//importando biblioteca Express
const mongoose = require('mongoose');//banco de dados
const cors = require('cors');

const routes = require('./routes');

const app = express();//cria servidor Express
const server = require('http').Server(app);//garante conexões http quanto socket
const io = require('socket.io')(server);//retorna uma função que recebe um server http

const connectedUsers = {}

io.on('connection', socket => {//toda vez que houver nova conexão
   const { user } = socket.handshake.query;
   connectedUsers[user] = socket.id;
})
mongoose.connect('mongodb+srv://diogo:diogo@cluster0-r61bo.mongodb.net/omnistack8?retryWrites=true&w=majority',{
   useNewUrlParser: true
});//conecta com o BD

app.use((req,res,next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   return next
});

app.use(cors());//garante que o React pode acessar o Node
app.use(express.json());
app.use(routes);//adicionando rotas

server.listen(5555);//habilitando porta 3333 para ouvir requisissões 