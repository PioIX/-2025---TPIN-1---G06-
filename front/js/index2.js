async function guardarUsuario(datos){
    try {
        
        response = await fetch(`http://localhost:4000/jugadoresRegistro`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datos) //JSON.stringify me convierte de objeto a JSON
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
        if (result.validar){
            window.location.href = "../html/juego.html";
        }
    } catch (error) {
        alert("No se pudo agregar el usuario")
        console.log(error)
    }
}

function crearUsuario() {
    let datos={
        nombre:ui.getNombre(),
        email:ui.getEmail(),
        contraseña:ui.getPassword(),
    }
    guardarUsuario(datos)
}




