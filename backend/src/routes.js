const express = require('express');
const DevController = require('./controllers/DevController');

const routes = express.Router();

/*Criando rota raiz
* req -> traz todas informações referentes à requisição do usuário
* res -> objeto para retornar resposta ao usuário
*/

routes.post('/devs', DevController.store);//criando algo
module.exports = routes;//exportando rotas para o servidor