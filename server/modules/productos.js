const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productosSchema = new Schema({
  
    nombre:{
   type: String,
   required: [true, 'Este campo es obligatorio']
   },
   
   preciouni:{
    type: Number,
    required: [true, 'Este campo es obligatorio']
   },
   
   categoria:{
       type: Schema.Types.ObjectId,
       ref: 'Categoria'
   },
   
   disponible:{
    type: Boolean,
    default: true
   },
   
   usuario:{
       type: Schema.Types.ObjectId,
       ref: 'Usuario'
   }
});

module.exports = mongoose.model('Productos', productosSchema);