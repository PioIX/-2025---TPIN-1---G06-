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

app.get('/Jugadores', async function(req,res){

    let respuesta;
    if (req.query.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE id=${req.query.id}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Jugadores");
    }    
    res.send(respuesta);
})



app.post('/jugadoresRegistro', async function(req,res) {

    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta = await realizarQuery(`SELECT * FROM Clubes WHERE nombre='${req.body.nombre}'`)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Clubes (nombre,web,titulos,clasico) VALUES
            ("${req.body.nombre}","${req.body.web}","${req.body.titulos}","${req.body.clasico}");
        `)
        res.send({res: "Club agregado"})
    } else {
        res.send({res: "Club ya existe"})
    }
})

app.post('/usuarios', async function(req, res) {
    console.log(req.body);

    let respuesta = await realizarQuery(`SELECT * FROM Usuarios WHERE correo='${req.body.email}'`);

    if (respuesta.length > 0) {  
        res.send({res: respuesta[0].contraseña})
    }else {
        res.send({res: "Usuario no encontrado"});     
    }
});



app.put('/Jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    UPDATE  Jugadores
    SET  goles  =  ${req.body.goles}
    WHERE  id_jugador=${req.body.id}`)
    res.send({res:"Jugador modificado"})
})


app.delete('/Jugadores', async function(req, res) {
    console.log(req.body);
    // Eliminar primero los jugadores asociados
    await realizarQuery(`DELETE FROM Jugadores WHERE id_jugador=${req.body.id}`);
    res.send({ res: "Jugador borrado" });
});

app.post('/Jugadores', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre='${req.body.nombre}'`)
    if (respuesta.length == 0){
        realizarQuery(`
        INSERT INTO Jugadores (nombre,goles,img) VALUES
            ("${req.body.nombre}",${req.body.goles},"${req.body.img}");
        `)
        res.send({res:"Jugador agregado"})
    }else {
        res.send({res:"El jugador ya existe"})
    }

})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

