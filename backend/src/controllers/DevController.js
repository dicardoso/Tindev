/*
*Criação, alteração, exclusão e listagem de um Desenvolvedor no BD
*A lógica da aplicação
*/
const axios = require('axios');
module.exports = {
   async store(req,res){
      const {username} = req.body;//selecionando apenas 'username'
      try {
         const response = await axios.get(`https://api.github.com/users/${username}`);
      } catch (error) {
         console.log('Erro no get');
      }
      return res.json(response.data);
   }
};