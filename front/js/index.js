

function ingresar() {
    let email = ui.getEmail()
    let password = ui.getPassword()

    let result = login(email, password)
    if (result > 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                idlog = result
                window.location.href = "../html/juego.html";
                userId = users[i].id
            }
        }
    }
    else if (result == 0) {
        ui.showModal("La contraseña es incorrecta", "Intente nuevamente")
    }
    else {
        ui.showModal("El usuario está mal puesto", "Intente nuevamente")

    }
}

function crearRegistro() {
    let datosRegistro={
        nombre:ui.getNombre(),
        email:ui.getEmail(),
        contraseña:ui.getPassword()
    }
    guardar(datosRegistro)
}



async function register(datosRegistro){
    try {
        response = await fetch(`http://localhost:4000/jugadoresRegistro`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datosRegistro) //JSON.stringify me convierte de objeto a JSON
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
        if(result.validar){
            ui.showModal("Registro Exitoso", result.res)
            window.location.href = "../html/juego.html";
        }else{
            ui.showModal("Error", result.res)
        }
        ui.showModal(result.res)
    } catch (error) {
        alert("No se pudo crear el usuario")
        console.log(error)
    }
}




