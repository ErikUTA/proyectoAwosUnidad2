const mongoose = require('mongoose');

let schema = mongoose.Schema; 

let usuarioSchema = new schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ] 
    },
    
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