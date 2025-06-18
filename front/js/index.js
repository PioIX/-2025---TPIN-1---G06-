async function ingresar(datosLogin) {

    try {
        
        const response = await fetch('/http://localhost:4000/usuarios', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(datosLogin), 
        });
        console.log(response)
        const result = await response.json();

        if (result.res > 0) {

            userId = result.userId;
            window.location.href = "../html/juego.html"; 
        } else if (result.res === 0) {
            
            ui.showModal("La contraseña o el mail es incorrecta", "Intente nuevamente");
        } 

    } catch (error) {
        
        console.error('Error al hacer la petición:', error);
        
    }
}



function crearLogin(){
    let datosLogin={
        email: ui.getEmail(),
        password: ui.getPassword()
    }
    enviarDatosLogin(datosLogin)
} 

