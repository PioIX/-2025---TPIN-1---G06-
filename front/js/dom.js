class UserInterface {
    constructor() { }

    getEmail() {
        return document.getElementById("correo").value;
    }

    getPassword() {
        return document.getElementById("contrasena").value;
    }
    getNombre() {
        return document.getElementById("nombre").value;
    }


    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;
        document.getElementById("modal").style.display = "block";
    }
    
    closeModal() {
        document.getElementById("modal").style.display = "none";
    }
    
}
const ui = new UserInterface();
