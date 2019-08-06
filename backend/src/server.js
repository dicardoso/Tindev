const express = require('express');//importando biblioteca Express

const server = express();//cria servidor Express

/*Criando rota raiz
* req -> traz todas informações referentes à requisição do usuário
* res -> objeto para retornar resposta ao usuário
*/
server.get('/', (req,res) =>{ 
   return res.json({ message: `Olá ${req.query.name}, tudo em cima?`});
   //USANDO CRASE (template string)
   //retorna todos os parametros que envia na url
   //json necessita de {} para enviar uma mensagem 
});
server.listen(3333);//habilitando porta 3333 para ouvir requisissões 