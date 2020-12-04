const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); 
const Usuario = require('../modules/usuario')
const app = express();   



    

    app.get('/usuario', function(req, res){ 
    
    let desde = req.query.desde || 0; 
    let hasta = req.query.hasta || 5; 

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

    app.post('/usuario', function(req, res){
       let body = req.body; 
       
       let usr = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
       });
       usr.save((error, usrDB) =>{
         if(error){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error favor de checar los campos',
                error
            })
           }
        res.json({
                ok: true,
               msg: 'Usuario INSERTADO con exito',
               usrDB 
         });
       });
    });


app.put('/usuario/:id', function(req, res){
        
        
let id = req.params.id;

let body = _.pick(req.body, ['nombre', 'email']) 

Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) =>{
            
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


app.delete('/usuario/:id', function(req, res){
    
        
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
    });

module.exports = app;