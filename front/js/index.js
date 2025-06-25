async function ingresar(datosLogin) {

<<<<<<< Updated upstream
    try {
        
        const response = await fetch('/http://localhost:4000/usuarios', {
=======
/*
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
}*/


async function ingresar(datosLogin) {

    try {
        
        const response = await fetch(`http://localhost:4000/usuarios`, {
>>>>>>> Stashed changes
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(datosLogin), 
        });
        console.log(response)
        const result = await response.json();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
        if (result.res > 0) {

            userId = result.userId;
            window.location.href = "../html/juego.html"; 
        } else if (result.res === 0) {
=======
        if (result.res == ui.getPassword()) {

            userId = result.userId;
            window.location.href = "../html/juego.html"; 
        } else{
>>>>>>> Stashed changes
            
=======
        if (result.res == ui.getPassword()) {
            if(result.esAdmin==1)
                userId = result.userId;
                window.location.href = "../html/admin.html";
        }   else if(result.esAdmin == 0){
                userId = result.userId;
                window.location.href = "../html/juego.html";
        }else{       
>>>>>>> Stashed changes
            ui.showModal("La contraseña o el mail es incorrecta", "Intente nuevamente");
        } 

        

    } catch (error) {
        
<<<<<<< Updated upstream
        console.error('Error al hacer la petición:', error);
=======
        console.log(error);
>>>>>>> Stashed changes
        
    }
}



function crearLogin(){
    let datosLogin={
        email: ui.getEmail(),
<<<<<<< Updated upstream
        password: ui.getPassword()
    }
    enviarDatosLogin(datosLogin)
} 
=======
        contraseña: ui.getPassword()
    }
    if (ui.getEmail()=="" || ui.getPassword()==""){
        ui.showModal("Error","Debes Rellenar todos los campos")
    }else{
        ingresar(datosLogin)
    }
} 






>>>>>>> Stashed changes

