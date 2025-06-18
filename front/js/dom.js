class UserInterface {
    constructor() { }

    getEmail() {
        return document.getElementById("email").value;
    }

    getPassword() {
        return document.getElementById("password").value;
    }

    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;
        document.getElementById("modal").style.display = "block";
    }
}
const ui = new UserInterface();
