const express = require('express');//importando biblioteca Express

const server = express();//cria servidor Express

/*Criando rota raiz
* req -> traz todas informações referentes à requisição do usuário
* res -> objeto para retornar resposta ao usuário
*/
server.get('/', (req,res) =>{
   return res.send('Hello world');
});
server.listen(3333);//habilitando porta 3333 para ouvir requisissões 