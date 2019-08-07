/**
 * Mesmo princípio dos likes
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

      loggedDev.dislikes.push(targetDev._id);

      await loggedDev.save();

      return res.json(loggedDev);
   }
};