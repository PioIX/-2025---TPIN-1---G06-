    let random=[]
<<<<<<< Updated upstream
=======
    let puntaje=0
    let jugador1=0
    let jugador2=0
>>>>>>> Stashed changes
    async function imgJugador1() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
<<<<<<< Updated upstream
        })
        let jugadores = await response.json()
        random = getRandomVector(jugadores);
        console.log(random);

        document.getElementById("imgJugador1").src = jugadores[random[0]].img
        document.getElementById("imgJugador2").src = jugadores[random[1]].img
        document.getElementById("goles").innerText = jugadores[random[0]].goles
    }
=======
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
    
>>>>>>> Stashed changes
    imgJugador1()

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomVector(jugadores) {
<<<<<<< Updated upstream
        random = [getRandomInt(jugadores.length) + 1]
        let random2 = getRandomInt(jugadores.length) + 1

        while(random[0] == random2) {
            random2 = getRandomInt(jugadores.length) + 1
        }
        random.push(random2);
        return random
    }
=======
        let index1 = getRandomInt(jugadores.length);
        let index2;
        do {
            index2 = getRandomInt(jugadores.length);
        } while (index1 === index2);
        return [index1, index2];
    }
    
>>>>>>> Stashed changes

    async function funcionMas() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let jugadores = await response.json()
<<<<<<< Updated upstream
        console.log(jugadores[random[0]].goles)
=======
        if(jugador1>jugador2 || jugador1==jugador2){
            document.getElementById("goles2").innerText = jugadores[random[1]].goles
            nuevoNivel()
        }else{
            window.location.href = "../html/defeat.html"
        }
>>>>>>> Stashed changes
        
    }

    async function funcionMenos() {
        let response = await fetch(`http://localhost:4000/JugadoresImg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let jugadores = await response.json()
<<<<<<< Updated upstream
        let random = getRandomVector(jugadores);
    }
=======
        if(jugador1<jugador2 || jugador1==jugador2){
            document.getElementById("goles2").innerText = jugadores[random[1]].goles
            nuevoNivel()
        }else{
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
        puntaje+=1
        let jugadores = await response.json();
        console.log(random[0]);
        console.log(random[1]);
        random[0] = random[1];
        
        let newRandom = getRandomVector(jugadores);
        random[1] = newRandom[1];
    
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
    
>>>>>>> Stashed changes
