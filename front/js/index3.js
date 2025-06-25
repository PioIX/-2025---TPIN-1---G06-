    let random=[]
    async function imgJugador1() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let jugadores = await response.json()
        random = getRandomVector(jugadores);
        console.log(random);

        document.getElementById("imgJugador1").src = jugadores[random[0]].img
        document.getElementById("imgJugador2").src = jugadores[random[1]].img
        document.getElementById("goles").innerText = jugadores[random[0]].goles
    }
    imgJugador1()

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomVector(jugadores) {
        random = [getRandomInt(jugadores.length) + 1]
        let random2 = getRandomInt(jugadores.length) + 1

        while(random[0] == random2) {
            random2 = getRandomInt(jugadores.length) + 1
        }
        random.push(random2);
        return random
    }

    async function funcionMas() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let jugadores = await response.json()
        console.log(jugadores[random[0]].goles)
        
    }

    async function funcionMenos() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let jugadores = await response.json()
        let random = getRandomVector(jugadores);
    }
