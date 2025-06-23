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
