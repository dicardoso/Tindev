const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

/*Criando rota raiz
* req -> traz todas informações referentes à requisição do usuário
* res -> objeto para retornar resposta ao usuário
*/

routes.get('/devs', DevController.indexDB);
routes.post('/devs', DevController.store);//criando um dev

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;//exportando rotas para o servidor