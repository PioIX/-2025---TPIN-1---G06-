let random = []
let puntaje = 0
let jugador1 = 0
let jugador2 = 0
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



async function funcionMas() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let jugadores = await response.json()
    if (jugador1 > jugador2 || jugador1 == jugador2) {
        document.getElementById("goles2").innerText = jugadores[random[1]].goles
        nuevoNivel()
    } else {
        window.location.href = "../html/defeat.html"
    }

}

async function funcionMenos() {
    let response = await fetch(`http://localhost:4000/JugadoresImg`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let jugadores = await response.json()
    if (jugador1 < jugador2 || jugador1 == jugador2) {
        document.getElementById("goles2").innerText = jugadores[random[1]].goles
        nuevoNivel()
    } else {
        window.location.href = "../html/defeat.html"
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

    random[0] = random[1];

    let index2;
    do {
        index2 = getRandomInt(jugadores.length);
    } while (index2 === random[0]);

    random[1] = index2;

    // Actualizamos el DOM
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