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

app.get('/JugadoresImg', async function(req,res){

    let respuesta;
    respuesta = await realizarQuery("SELECT * FROM Jugadores")   
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

app.post('/usuarios', async function(req, res) {
    console.log(req.body);

    let respuesta = await realizarQuery(`SELECT * FROM Usuarios WHERE correo='${req.body.email}'`);

    if (respuesta.length > 0) {
        res.send({res: respuesta[0].contraseña,
                esAdmin: respuesta[0].es_admin,
                record:respuesta[0].record,
                correo:respuesta[0].correo
        })
             
    }else {
        res.send({res: "Usuario no encontrado"});     
    }
});


app.post('/Record', async function(req, res) {
    console.log(req.body);
    let respuesta = await realizarQuery(`SELECT record FROM Usuarios WHERE correo='${req.body.email}'`);
    res.send({res: respuesta[0]});     
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

app.get('/usuariosPuntaje', async function(req,res){
    
    let respuesta;
    if (req.query.email != undefined) {
        respuesta = await realizarQuery(`SELECT record FROM Usuarios WHERE correo=${req.query.email}`)
    } else {
        respuesta = { error: "no se encontro record" };
    }    
    res.send(respuesta);
})


app.put('/usuariosRecord', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`UPDATE Usuarios SET record = ${req.body.puntaje} WHERE correo = '${req.body.correo}'`);
        res.send(respuesta)

    } catch (error) {
        console.error("Error al actualizar el record:", error);
        
    }
});

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});
