async function ingresar(datosLogin) {
    try {
        const response = await fetch('http://localhost:4000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosLogin),
        });
        console.log(response)
        const result = await response.json();
        if (result.res == ui.getPassword()) {
            localStorage.setItem("record", result.record)
            localStorage.setItem("email", result.correo)
            if (result.esAdmin == 1) {
                userId = result.userId;
                window.location.href = "../html/admin.html";
            } else {
                userId = result.userId;
                window.location.href = "../html/juego.html";
            }

        } else {
            ui.showModal("La contraseña o el mail es incorrecta", "Intente nuevamente");
        }




    } catch (error) {
        console.error('Error al hacer la petición:', error);
    }
}

function crearLogin() {
    let datosLogin = {
        email: ui.getEmail(),
        contraseña: ui.getPassword()
        
    }
    if (ui.getEmail() == "" || ui.getPassword() == "") {
        ui.showModal("Error", "Debes Rellenar todos los campos")
    } else {
        ingresar(datosLogin)
    }
}