const { query } = require('express');
const express = require('express');
const _ = require('underscore'); //ESTE ES UNA UNA MUY BUENA LIBRERIA
const Usuario = require('../modules/usuario')
const app = express();    

// app.get('/', function(req, res){ // Aqui indicamos una funcion get, la cual pide 2 parametros, la url y la funcion como tal (el req es solicitar algo del cliente) y (el res, es la respuesta del servidor)
//     res.send('hellow word');// el send es acepta etiquetado HTML
//}); 
    
//++++++++++++++++++++++++++++++++++++ GET ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.get('/usuario', function(req, res){ //registramos la ruta usuarios.
    
    let desde = req.query.desde || 0; //QUERY es otra manera en la que el cliente le manda datos al servidor. 
    let hasta = req.query.hasta || 5; // Y con query no ocupo ponerlo en la ruta

         Usuario.find({ estado: true })
         .skip(Number(desde))
         .limit(Number(hasta))
         .exec((err, usuarios)=>{
            if(err) {
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error al consultar',
            err
          });
        }

        res.json({
            ok: true,
            msg: 'Lista de usuarios obtenida con exito',
            conteo: usuarios.length, 
            usuarios
        })
      });
    });
//++++++++++++++++++++++++++++++++++++++++ FIN DEL GET ++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++ POST ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.post('/usuario', function(req, res){
       let body = req.body; // estoy simplificando los datos para que me los mande en json y por body.
       
       let usr = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password 
       });

       usr.save((error, usrDB) =>{
         if(error){
            return res.status(400).json({//STATUS es el tipo de error que quiero mandarle
                ok: false,
                msg: 'Ocurrio un error favor de checar los campos',
                error
            })
           }
        res.json({
                ok: true,
               msg: 'Usuario INSERTADO con exito',
               usrDB //estoy enviando la varible cachada al cliente
         });
       });
    });
//++++++++++++++++++++++++++++++++ FIN DEL POST +++++++++++++++++++++++++++++++++++++++++++++++++++++  
//++++++++++++++++++++++++++++++++++++ PUT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
app.put('/usuario/:id', function(req, res){//aqui en la ruta cocatenamos un id y un nombre y express las hagarra como variables y podemos crear las variables y darles valores adentro de la funcion.
        
        
let id = req.params.id;//cuando usamos params es por que en la url YA esta declarado el campo con el que afuerzas debemos poner un valor.

let body = _.pick(req.body, ['nombre', 'email']) //de la variable body voy a hagarrar el nombre y el email, PICK es un metodo que me dice que puedo escojer un campo y con el underscore le estoy diciendo que me ignore todo lo demas.

Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) =>{
            //la linea de arriba es un update y se lo estoy haciendo al usuraio y tambien estoy pidiendo parametros para que la consulta trabaje de mayor eficacia. Ahora el primer valor new, significa que si no lo encuentra lo crea, despues runValidators que corra las validaciones que le puse en el modelo, el context es como se va a enviar la consulta, y luego vamos a pedir 2 parametros que son el error o la respuesta positiva
        if(err){ 
           return  res.status(400).json({
             ok: true,
             msg: 'Ocurrio un error al momento de actualizar',
             err
            });
          }
          res.json({
            ok: true,
            msg: 'Usuario actualizado con EXITO',
            usuario: usrDB
           });
        });
    });
//++++++++++++++++++++++++++++++++++++++ FIN DEL PUT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
//+++++++++++++++++++++++++++++++++++++++ DELETE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.delete('/usuario/:id', function(req, res){
    
        
        //++++++++++ CODIGO PARA ELIMINAR BORRAR DEFINITICAMENTE A UN USUARIO, LO CUAL NO ES MUY CONVENIENTE ++++++++++++++++++++++++++    
        // let id = req.params.id;
        // Usuario.deleteOne({ _id: id }, (err, usuarioBorrado)=>{
        //       if(err){
        //               res.status(400).json({
        //                     ok: false,
        //                     msg: 'ocurrio un error al momento de borrar un usuario',
        //                     err
        //                   })
        //                  }
        //              res.json({
        //                     ok: true,
        //                     msg: 'usuario eliminado con exito',
        //                     usuario: usuarioBorrado
        //                  })
        //                 })
                        
                        
//+++++++++++++++++++++ CODIGO PARA NO ELIMINAR UN USUARIO SINO SOLO DESACTIVARLO ++++++++++++++++++++++++++++++++++        
      let id = req.params.id;
      Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) =>{
             if(err){
               res.status(400).json({
                        ok: false,
                        msg: 'ocurrio un error al momento de borrar un usuario',
                        err
               });
          }
             res.json({
                   ok: true,
                   msg: 'usuario eliminado con exito',
                   usuario: usrDB
          });
       });
                        
                        //USAR ESTE CODIGO SOLO PARA VEREFICAR QUE SI FUNCIONA LA RUTA, SOLO PARA PRUEBAS 
                        // let id = req.params.id;
                        //         res.json({
                            //         ok: 200,
        //         mensaje: 'Usuario eliminado con exito',
        //         id: id
        //         });
    });
//++++++++++++++++++++++++++++++++++++ FIN DEL DELETE +++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = app;