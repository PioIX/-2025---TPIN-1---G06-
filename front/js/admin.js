async function selectJugadores() {
    let select = document.getElementById("select1").innerHTML
    let response = await fetch(`http://localhost:4000/Jugadores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let jugadores = await response.json()
    for (i = 1; i < jugadores.length; i++) {
        select +=
            `
                <option value=${jugadores[i].id_jugador}>${jugadores[i].nombre}</option>
        `
    }
    document.getElementById("select1").innerHTML = select
    document.getElementById("select2").innerHTML = select

}
selectJugadores()