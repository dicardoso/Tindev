const {Schema, model} = require('mongoose');//apenas dois componentes da biblioteca

const DevSchema = new Schema({
   name:{
      type: String,
      require: true,
   },
   user:{
      type: String,
      require:true,
   },
   bio: String,
   avatar:{
      type:String,
      require:true,
   },
   likes:[{
      type: Schema.Types.ObjectId,//id gerado pelo github
      ref: 'Dev'
   }],
   dislikes:[{
      type: Schema.Types.ObjectId,//id gerado pelo github
      ref: 'Dev'
   }],
},{
   timestamps:true
   /*Cira duas coluna na tabela  
   *( createdAt |    UpdatedAt)
   *data inicio | data ultima atual
   */
});

module.exports = model('Dev',DevSchema);
