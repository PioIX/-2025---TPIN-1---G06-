var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/clubes', async function(req,res){
    let respuesta;
    if (req.query.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Clubes WHERE id=${req.query.id}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Clubes");
    }    
    res.send(respuesta);
})


app.post('/jugadoresRegistro', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta = await realizarQuery(`SELECT * FROM Usuarios WHERE correo='${req.body.email}'`)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Usuarios (nombre,correo,contraseña) VALUES
            ("${req.body.nombre}","${req.body.email}","${req.body.contraseña}");
        `)
        res.send({res: "Usuario agregado", validar:true})
    } else {
        res.send({res: "Usuario con este mail ya existe", validar:false})
    }
})


app.put('/clubes', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    UPDATE  Clubes
    SET  titulos  =  ${req.body.titulos}
    WHERE  id=${req.body.id}`)
    res.send({res:"Club modificado"})
})



app.delete('/estadios', function(req,res) {
    console.log(req.body)
    realizarQuery(`DELETE FROM Estadios WHERE id=${req.body.id}`)
    res.send({res:"Estadio borrado"})
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});
