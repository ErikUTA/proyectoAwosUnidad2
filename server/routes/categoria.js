
const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../modules/categorias'); 



app.get('/categoria', (req, res) =>{
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

 Categoria.find({}) 
 .skip(Number(desde))
 .limit(Number(hasta))
 
 .populate('usuario', 'nombre email') 
 
 .exec((err, categorias)=>{
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
                                        });
                                          }) 


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
 
 app.put('/categoria/:id', (req, res)=>{
  let id = req.params.id; 
  let body = _.pick(req.body, ['descripcion', 'usuario']);

   Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, catDB)=>{
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
 
 app.delete('/categoria/:id', function(req, res){
 let id = req.params.id;
        Categoria.findByIdAndRemove(id, { context: 'query' } ,(err, categoriaBorrado)=>{
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
 
module.exports = app