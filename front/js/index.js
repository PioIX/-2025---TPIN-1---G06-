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

 
        if (result.res > 0) {

            userId = result.userId;
            window.location.href = "../html/juego.html"; 
        } else if (result.res === 0) {


 
        if (result.res == ui.getPassword()) {
            userId = result.userId;
            window.location.href = "../html/juego.html"; 
 
        } else{
 
            

        if (result.res == ui.getPassword()) {
            if(result.esAdmin==1)
                userId = result.userId;
                window.location.href = "../html/admin.html";
        }   else if(result.esAdmin == 0){
                userId = result.userId;
                window.location.href = "../html/juego.html";
        }else{       
 

        } else{       
 
            ui.showModal("La contraseña o el mail es incorrecta", "Intente nuevamente");
        } 

        

    } catch (error) {
        console.error('Error al hacer la petición:', error);     
    }
}

function crearLogin(){
    let datosLogin={
        email: ui.getEmail(),
        contraseña: ui.getPassword()
    }
    if (ui.getEmail()=="" || ui.getPassword()==""){
        ui.showModal("Error","Debes Rellenar todos los campos")
    }else{
        ingresar(datosLogin)
    }
}