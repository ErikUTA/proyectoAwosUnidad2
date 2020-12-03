const mongoose = require('mongoose');  //esta linea es para que sirva mi mongodb

const Schema = mongoose.Schema;   //esta otra linea es para guardar en la variable Schema el esquema de la bd

let categoriaSchema = new Schema({ // aqui la estoy instanciando para crear la collecion de la bd
    
    descripcion:{           //este es mi primer campo que requiero en mi coleccion y adentro van a ir sus propiedades
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria']
    },
    usuario:{                     //este es el segundo campo que requiero en mi coleccion
     type: Schema.Types.ObjectId, //asi se declaran las llaves FORANEAS 
    ref: 'Usuario'                //aqui se refetencia la coleccion foranea
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema) //Asi se exporta la coleccion producida