/**
 * Controlador criado para manter a regra dos 5 métodos
 */
const Dev = require('../models/Dev');
module.exports = {
   async store(req,res){//criando um novo Like
      
      const { user } = req.headers;//usuário logado
      const { devId } = req.params;//usuário alvo do like

      //Buscando users no BD
      const loggedDev = await Dev.findById(user);
      const targetDev = await Dev.findById(devId);

      if (!targetDev){//verifica se o usuário existe
         return res.status(400).json({error: 'Dev não existe!'});
      }

      if (targetDev.likes.includes(loggedDev._id)){//Testa se o target já deu Like no logged
         console.log('DEU MATCH!!!');
      }

      if(!loggedDev.likes.includes(targetDev._id)){//Testa se usuário já deu like no usuário
         loggedDev.likes.push(targetDev._id);
         await loggedDev.save();
      } 

      return res.json(loggedDev);
   }
};