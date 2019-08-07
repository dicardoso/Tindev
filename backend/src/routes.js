const express = require('express');
const routes = express.Router();
/*Criando rota raiz
* req -> traz todas informações referentes à requisição do usuário
* res -> objeto para retornar resposta ao usuário
*/
routes.get('/', (req,res) =>{ 
   return res.json({ message: `Olá ${req.query.name}, tudo bom contigo?`});
   //USANDO CRASE (template string)
   //retorna todos os parametros que envia na url
   //json necessita de {} para enviar uma mensagem 
});

routes.post('/devs', (req, res)=>{
   console.log(req.body);

   return res.json({ok: true});
});//criando algo
module.exports = routes;//exportando rotas para o servidor