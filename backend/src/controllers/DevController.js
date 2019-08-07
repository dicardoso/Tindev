/*
*Criação, alteração, exclusão e listagem de um Desenvolvedor no BD
*A lógica da aplicação
*/
const axios = require('axios');
module.exports = {
   async store(req,res){
      const {username} = req.body;//selecionando apenas 'username'
      
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log(`Buscando ${username} no Github` );
      return res.json(response.data);
   }
};