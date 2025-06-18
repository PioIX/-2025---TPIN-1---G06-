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

app.get('/jugadores', async function(req,res){
    let respuesta;
    if (req.query.dni != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE dni=${req.query.dni}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Jugadores");
    }    
    res.send(respuesta);
})

app.get('/estadios', async function(req,res){
    let respuesta;
    if (req.query.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Estadios WHERE id=${req.query.id}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Estadios");
    }    
    res.send(respuesta);
})


app.post('/clubes', async function(req,res) {
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

app.post('/jugadores', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE apellido='${req.body.apellido}'`)
    if (respuesta.length == 0){
        realizarQuery(`
        INSERT INTO Jugadores (apellido,nombre,edad,posicion,goles,id_club) VALUES
            ("${req.body.apellido}","${req.body.nombre}",${req.body.edad},"${req.body.posicion}",${req.body.goles},${req.body.id_club});
        `)
        res.send({res:"Jugador agregado"})
    }else {
        res.send({res:"El jugador ya existe"})
    }

})

app.post('/estadios',async function(req,res) {
    let respuesta = await realizarQuery(`SELECT * FROM Estadios WHERE nombre='${req.body.nombre}'`)
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    if (respuesta.length==0){realizarQuery(`
    INSERT INTO Estadios (nombre,calle,capacidad,id_club) VALUES
        ("${req.body.nombre}","${req.body.calle}",${req.body.capacidad},${req.body.id_club});
    `)
    res.send({res:"Estadio agregado"})
    }else{
        res.send({res:"El estadio ya existe"})
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

app.put('/jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    UPDATE  Jugadores
    SET  goles  =  ${req.body.goles}
    WHERE  dni=${req.body.dni}`)
    res.send({res:"Jugadores modificado"})
})

app.put('/estadios', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    UPDATE  Estadios
    SET  capacidad  =  ${req.body.capacidad}
    WHERE  id=${req.body.id}`)
    res.send({res:"Estadio modificado"})
})

app.delete('/clubes', async function(req, res) {
    console.log(req.body);
    // Eliminar primero los jugadores asociados
    await realizarQuery(`DELETE FROM Jugadores WHERE id_club=${req.body.id}`);
    await realizarQuery(`DELETE FROM Estadios WHERE id_club=${req.body.id}`);
    // Ahora puedes eliminar el club
    await realizarQuery(`DELETE FROM Clubes WHERE id=${req.body.id}`);
    res.send({ res: "Club borrado" });
});


app.delete('/jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`DELETE FROM Jugadores WHERE dni=${req.body.dni}`)
    res.send({res:"Jugadores borrado"})
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
