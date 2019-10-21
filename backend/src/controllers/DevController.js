/**
 *Criação, alteração, exclusão e listagem de um Desenvolvedor no BD
 *A lógica da aplicação
 *Um controlador não pode ter mais que cinco métodos fundamentais
 *INDEX - listar
 *SHOW - mostra um
 *STORE
 *UPDATE
 *DELETE
 */
const axios = require('axios');
const Dev =require('../models/Dev');

module.exports = {
   async indexDB(req, res){
      const {user} = req.headers;

      const loggedDev = await Dev.findById(user);
      
      //listar usuarios que não receberam like ou dislike nem é o logado
      const users = await Dev.find({//aplicando filtro 
         //$and:[] aplica o AND a todos dentro do []
         $and:[
            { _id: { $ne: user } },//que o ID não seja igual a USER
            { _id: { $nin: loggedDev.likes}},//não está DENTRO de likes
            { _id: { $nin: loggedDev.dislikes}},//não está DENTRO de dislikes
         ],
      })
      return res.json(users);
   },
   async store(req,res){
      const {username} = req.body;//selecionando apenas 'username'

      const userExists = await Dev.findOne({user: username});//encontra um usuário

      if (userExists){//testa se já existe
         return res.json(userExists);
      }
      
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log(`Buscando ${username} no Github` );

      const {name,bio,avatar_url: avatar} = response.data;//pegando as informações do response por desestruturação
      const dev = await Dev.create({
         name,
         user: username,
         bio,
         avatar
      })
      return res.json(dev);
   }
};