const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../modules/productos');

app.get('/producto', (req, res)=>{
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

  Productos.find({})
  .skip(Number(desde))
  .limit(Number(hasta))
  .populate('usuario', 'nombre email')
  .populate('categoria', 'descripcion')
  .exec((err, producto)=>{
      
    if(err){
        res.status(400).json({
            ok: false,
            msg: 'ocurrio un error',
            err
        });
      }
      res.json({
          ok: true,
          mensaje: 'Productos consultados con EXITO!',
          productos: producto
      })
  });
});

app.post('/producto', (req, res)=>{
    
let body = req.body
    let pro = new Productos({
   nombre:  body.nombre,
   preciouni: body.preciouni,
   categoria: body.categoria, 
   usuario: body.usuario
  });
  
  pro.save((err, proDB)=>{
      if(err){
         return res.status(400).json({
              ok: false,
              msg: 'Ocurrio un error al insertar el producto',
              err
          })
        }
        res.json({
            ok: true,
            msg: 'Todo salio bien bro',
            proDB
    });
  });
});


app.put('/producto/:id', (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['usuario', 'nombre', 'categoria', 'preciouni']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, proDB)=>{
        if(err){
          return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar el producto',
                err
            });
        }
      res.json({
          ok: true,
          msg: 'Producto Actulizado con EXITO',
          producto: proDB
    });  
  });
});


app.delete('/producto/:id', (req, res)=>{
    let id = req.params.id;
    Productos.deleteOne({_id: id}, (err, proBorrado)=>{
     if(err){
         res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error al momento de borrar el producto',
            err
         })
        }

    res.json({
      ok: true,
      msg: 'Producto borrado con EXITO',
      producto: proBorrado
    });
  });
});

module.exports = app;