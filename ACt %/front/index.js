async function tablaClubes() {
    let tabla = document.getElementById("tabla").innerHTML
    let response = await fetch(`http://localhost:4000/clubes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let clubes = await response.json()
    for (i = 1; i < clubes.length; i++) {
        tabla +=
            `<tr>
            <td>${clubes[i].id}</td>
            <td>${clubes[i].nombre}</td>
            <td>${clubes[i].web}</td>
            <td>${clubes[i].titulos}</td>
            <td>${clubes[i].clasico}</td>
        </tr>
        `
    }
    document.getElementById("tabla").innerHTML = tabla
}
tablaClubes()

async function guardar(datos){
    try {
        
        response = await fetch(`http://localhost:4000/clubes`,{
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
        alert("No se pudo agregar el club")
        console.log(error)
    }
}

function crear() {
    let datos={
        nombre:getNombre(),
        web:getWeb(),
        titulos:getTitulos(),
        clasico:getClasico()
    }
    guardar(datos)
}

async function selectClubes() {
    let select = document.getElementById("select").innerHTML
    let response = await fetch(`http://localhost:4000/clubes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let clubes = await response.json()
    for (i = 1; i < clubes.length; i++) {
        select +=
            `
                <option value=${clubes[i].id}>${clubes[i].nombre}</option>
        `
    }
    document.getElementById("select").innerHTML = select
    document.getElementById("select2").innerHTML = select

}
selectClubes()

async function borrar() {
    try {
        let idSeleccionado = document.getElementById("select").value
        response = await fetch(`http://localhost:4000/clubes`,{
            method:"DELETE", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({id:idSeleccionado})
        })
        console.log("El club se ha borrado correctamente")
    } catch (error) {
        alert("No se ha podida borrar el club")
        console.log(error)
    }
}

async function modificar(){
    try {
        let idSeleccionado = document.getElementById("select2").value
        response = await fetch(`http://localhost:4000/clubes`,{
            method:"PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({id:idSeleccionado, titulos:getTitulosMod()}) //JSON.stringify me convierte de objeto a JSON
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo modificar el club")
        console.log(error)
    }
}