const mongoose = require('mongoose');

let schema = mongoose.Schema; //aqui le estamos diciendo que en la variable Schema va a ejecutar la tabla de mongoose

let usuarioSchema = new schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ] 
    },// En el dato nombre le estamos asignando 2 propiedades y adentro de la propiedad required le estamos asignando 2 parametros los cuales son, que el required esta activo y un mensaje por si dejan el nombre vacio.
    
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
            type: Boolean,
            default: false
    }
}) 

module.exports = mongoose.model('Usuario', usuarioSchema)