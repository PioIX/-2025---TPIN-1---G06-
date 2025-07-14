let random = []
let puntaje = 0
let jugador1 = 0
let jugador2 = 0
let record = parseInt(localStorage.getItem("record"))
let email = localStorage.getItem("email")


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const sonidoVictoria = new Audio("../audios/win.mp3");
sonidoVictoria.volume = 1;


async function imgJugador1() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let jugadores = await response.json();

    random = getRandomVector(jugadores);
    document.getElementById("imgJugador1").src = jugadores[random[0]].img;
    document.getElementById("imgJugador2").src = jugadores[random[1]].img;
    document.getElementById("jugador1").innerText = jugadores[random[0]].nombre;
    document.getElementById("jugador2").innerText = jugadores[random[1]].nombre;
    document.getElementById("goles").innerText = jugadores[random[0]].goles;
    document.getElementById("puntaje").innerText = puntaje;
    jugador1 = jugadores[random[0]].goles;
    jugador2 = jugadores[random[1]].goles;
    actualizarRecordSiEsMayor(puntaje)
}
imgJugador1()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomVector(jugadores) {
    let index1 = getRandomInt(jugadores.length);
    let index2 = getRandomInt(jugadores.length);

    while (index1 === index2) {
        index2 = getRandomInt(jugadores.length);
    }
    return [index1, index2];
}

function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 1000,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#00fff0', '#00c2ff', '#33ffff', '#66ffff'],
    });
}

async function funcionMas() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let jugadores = await response.json();

    if (jugador1 > jugador2 || jugador1 === jugador2) {
        document.getElementById("goles2").innerText = jugadores[random[1]].goles;
        nuevoNivel();
        lanzarConfeti();
        activarEfectoPunto();
        sonidoVictoria.play();
    } else {
        localStorage.setItem("record", record)
        localStorage.setItem("puntaje", puntaje)
        window.location.href = "../html/defeat.html";
    }
}

async function funcionMenos() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let jugadores = await response.json();

    if (jugador1 < jugador2 || jugador1 === jugador2) {
        document.getElementById("goles2").innerText = jugadores[random[1]].goles;
        nuevoNivel();
        lanzarConfeti();
        activarEfectoPunto();
        sonidoVictoria.play();

    } else {
        localStorage.setItem("record", record)
        localStorage.setItem("puntaje", puntaje)
        window.location.href = "../html/defeat.html";
    }
}

async function nuevoNivel() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let jugadores = await response.json();
    puntaje += 1;
    actualizarRecordSiEsMayor();
    let prevJugador1 = random[0];

    random[0] = random[1];

    let index2 = getRandomInt(jugadores.length);

    while (index2 === random[0] || index2 === prevJugador1) {
        index2 = getRandomInt(jugadores.length);
    }

    random[1] = index2;

    document.getElementById("imgJugador1").src = jugadores[random[0]].img;
    document.getElementById("imgJugador2").src = jugadores[random[1]].img;
    document.getElementById("jugador1").innerText = jugadores[random[0]].nombre;
    document.getElementById("jugador2").innerText = jugadores[random[1]].nombre;
    document.getElementById("goles").innerText = jugadores[random[0]].goles;
    document.getElementById("goles2").innerText = "???";
    document.getElementById("puntaje").innerText = puntaje;

    jugador1 = jugadores[random[0]].goles;
    jugador2 = jugadores[random[1]].goles;
}

function activarEfectoPunto() {
    let efectoPunto = document.getElementById("efecto-punto");
    efectoPunto.style.opacity = 1;
    efectoPunto.style.transform = 'translate(-50%, -50%) scale(1)';
    efectoPunto.innerText = `+1`;

    efectoPunto.style.animation = 'animacion-punto 1s ease-out';

    setTimeout(() => {
        efectoPunto.style.opacity = 0;
        efectoPunto.style.transform = 'translate(-50%, -50%) scale(0)';
    }, 1000);
}

async function actualizarRecordSiEsMayor() {
    document.getElementById("record").innerText = record;
    if (puntaje > record) {
        document.getElementById("record").innerText = puntaje;
        try {
            let correo = email
            response = await fetch(`http://localhost:4000/usuariosRecord`, {
                method: "PUT", //GET, POST, PUT o DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ puntaje: puntaje, correo: correo })
            })
            console.log("El Record se ha actualizado correctamente")
            record = puntaje;
            localStorage.setItem("record", record);

        } catch (error) {
            ui.showModal("Error", "No se ha podida actualizar el record")
            console.log(error)
        }

    }

}
