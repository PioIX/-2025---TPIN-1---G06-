async function selectJugadores() {
    let select = document.getElementById("select1").innerHTML
    let response = await fetch(`http://localhost:4000/Jugadores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let jugadores = await response.json()
    for (i = 0; i < jugadores.length; i++) {
        select +=
            `
                <option value=${jugadores[i].id_jugador}>${jugadores[i].nombre}</option>
        `
    }
    document.getElementById("select1").innerHTML = select
    document.getElementById("select2").innerHTML = select

}
selectJugadores()

async function borrar() {
    try {
        let idSeleccionado = document.getElementById("select2").value
        response = await fetch(`http://localhost:4000/Jugadores`,{
            method:"DELETE", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({id:idSeleccionado})
        })
        console.log("El jugador se ha borrado correctamente")
    } catch (error) {
        ui.showModal("Error","No se ha podida borrar el jugador")
        console.log(error)
    }
}

async function modificar(){
    try {
        let idSeleccionado = document.getElementById("select1").value
        response = await fetch(`http://localhost:4000/Jugadores`,{
            method:"PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({id:idSeleccionado, goles:ui.getJugadoresMod()}) //JSON.stringify me convierte de objeto a JSON
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo modificar el jugador")
        console.log(error)
    }
}

async function guardar(datos){
    try {
        response = await fetch(`http://localhost:4000/Jugadores`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datos) //JSON.stringify me convierte de objeto a JSON
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo agregar el jugador")
        console.log(error)
    }
}

function crear() {
    let datos={
        nombre:ui.getNombreCr(),
        goles:ui.getGolesCr(),
        img:ui.getImgCr(),
    }
    if (ui.getNombreCr()=="" || ui.getGolesCr()=="" || ui.getImgCr()==""){
        ui.showModal("Error","Debes Rellenar todos los campos")
    }else{
        guardar(datos)
    }
}