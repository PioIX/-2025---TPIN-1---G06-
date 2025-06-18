class UserInterface {
    constructor() { }

    getEmail() {
        return document.getElementById("email").value;
    }

    getPassword() {
        return document.getElementById("password").value;
    }

    getNombre() {
        return document.getElementById("nombre").value;
    }

    getSelectBorrar() {
        return document.getElementById("nombre").value;
    }
    
    
    getJugadoresMod() {
        return document.getElementById("ingresoJugadoresMod").value
    }    
    
    getNombreCr() {
        return document.getElementById("nombreAgregar").value
    }    
    
    getImgCr() {
        return document.getElementById("imagenAgregar").value
    }    
    
    getGolesCr() {
        return document.getElementById("golesAgregar").value
    }    
    
    



    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;
        document.getElementById("modal").style.display = "block";
    }
}
const ui = new UserInterface();
