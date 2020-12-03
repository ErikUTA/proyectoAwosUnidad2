/*****Aqui vamos hacer las rutas como en la de USUARIOS*****/
const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../modules/categorias'); //se declara con MAYUSCULA la base de datos : Categoria


//++++++++++++++++++++++++++++++++++++ GET ++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/categoria', (req, res) =>{
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

 Categoria.find({}) //Aqui vamos hacer la primer consulta
 .skip(Number(desde))
 .limit(Number(hasta))
 
 .populate('usuario', 'nombre email') //Este metodo es muy util ya que funciona como un tipo JOIN pero mas sencillo me entrecruza las tablas
 
 .exec((err, categorias)=>{//en este caso la variable categorias es el RES
       if(err) {
        res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error al listar las categorias',
            err
          });
        }
   
 res.json({
   ok: true,
   msg: 'Categorias listadas con EXITO',
   conteo: categorias.length,
   categorias  
});
                                        });////////// Aqui se acaba la CONSULTA 
                                          }) ///////////// AQUI SE ACABA EL GET 
//++++++++++++++++++++++++++++++++++++++++ FIN DEL GET ++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++ POST ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 app.post('/categoria', (req, res)=>{
    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });
    cat.save((err, catDB)=>{
        if(err) {
            res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al Insertar la categoria',
                err
              });
            }
            res.json({
                ok: true,
                msg: 'Categoria insertada con EXITO',
                catDB  
      });
    });
 });
 //++++++++++++++++++++++++++++++++++++++++ FIN DEL POST ++++++++++++++++++++++++++++++++++++++++++++++++
 //++++++++++++++++++++++++++++++++++ PUT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
 app.put('/categoria/:id', (req, res)=>{
  let id = req.params.id; 
  let body = _.pick(req.body, ['descripcion', 'usuario']);// con esta linea de codigo le estoy diciendo que quiero del body solo la descripcion y el usuario

   Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, catDB)=>{// findByIdAndUpdate es el metodo de mongo para hacer update
    if(err) {
     return res.status(400).json({
          ok: false,
          msg: 'Ocurrio un error al Insertar la categoria',
          err
        });
      }
      res.json({
          ok: true,
          msg: 'Categoria fue actualizada con EXITO',
          catDB  
     });
   });
 });
 //+++++++++++++++++++++++++++++++++++++ FIN DEL PUT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 //+++++++++++++++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
 app.delete('/categoria/:id', function(req, res){
 let id = req.params.id;
        Categoria.deleteOne({ _id: id }, (err, categoriaBorrado)=>{
              if(err){
                      res.status(400).json({
                            ok: false,
                            msg: 'ocurrio un error al momento de borrar un usuario',
                            err
                          })
                         }
                     res.json({
                            ok: true,
                            msg: 'categoria eliminada con exito',
                            categoria: categoriaBorrado
                         });
                      });
});
 //+++++++++++++++++++++++++++++++++++++ FIN DEL DELETE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = app