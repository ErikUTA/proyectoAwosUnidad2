const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res){ // Aqui indicamos una funcion get, la cual pide 2 parametros, la url y la funcion como tal (el req es solicitar algo del cliente) y (el res, es la respuesta del servidor)
res.send('hellow word');// el send es acepta etiquetado HTML
});



app.get('/usuario', function(req, res){ //registramos la ruta usuarios.
            res.json({
            ok: 200,
            mensaje: 'Usuarios consultados con exito'
            });
});



app.post('/usuario', function(req, res){
   let nombre = req.body.nombre // estoy recibiendo la varible nombre con body
   let body = req.body; // estoy simplificando los datos para que me los mande en json y por body.

   if(nombre === undefined){//validando
    res.status(400).json({//STATUS es el tipo de error que quiero mandarle
        ok: 400,
        mensaje: 'Favor de enviar el valor del nombre'
    }); 
   }else{
        res.json({
            ok: 200,
            mensaje: 'Usurario insertado con exito',
            body: body //estoy enviando la varible cachada al cliente
     });
   }
});



app.put('/usuario/:id/:nombre', function(req, res){//aqui en la ruta cocatenamos un id y un nombre y express las hagarra como variables y podemos crear las variables y darles valores adentro de la funcion.
let id = req.params.id
let nombre = req.params.nombre //esta es la forma de cachar datos
        res.json({ //le estoy mandando a mi json 4 campos
            ok: 200,
            mensaje: 'Usuario actualizadocon exito',
            id: id,
            nombre: nombre
        });
});

 
app.delete('/usuario/::id', function(req, res){
    let id = req.params.id;
            res.json({
            ok: 200,
            mensaje: 'Usuario eliminado con exito',
            id: id
            });
});

app.listen(process.env.PORT, () =>{
    console.log('El servidor esta escuchando en el puerto: ', process.env.PORT);
});