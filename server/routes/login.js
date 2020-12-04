const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../modules/usuario');
const app = express();

app.post('/login', (req, res)=>{
    let body = req.body
    
    Usuario.findOne({ email: body.email, estado: true}, (err, usrDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de logearse',
                err
            })
          }
    if(!usrDB){
       return res.status(400).json({
        ok: false,
        msg: 'Mail incorrecto, intentalo otra vez',
        err
      });
     }
 if(!bcrypt.compareSync(body.password, usrDB.password)){
         return res.status(401).json({
             ok: false, 
             msg: 'Contraseña incorrecta, intentalo otra vez'
         });
        }
       res.json({
         ok: true,
         msg: `Bienvenido a la pagina ${usrDB.nombre}`,
         usrDB
       });
   });
});

module.exports = app