require('./config/config')
const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())    

// Habilitar CORS
// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

app.get('/', function(req, res){ 
res.send('hellow word');
}); 

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/productos'));
app.use(require('./routes/login'));

mongoose.connect('mongodb+srv://Emmanuel:supermegamofing2@cluster0.jvqv6.mongodb.net/cafeteria',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
  useCreateIndex: true}, 

  (err, res) =>{
    if(err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () =>{
    console.log('El servidor esta escuchando en el puerto:', process.env.PORT);
});