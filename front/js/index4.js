record = parseInt(localStorage.getItem("record"))
puntaje = parseInt(localStorage.getItem("puntaje"))

function recordPuntaje(){
    document.getElementById("record2").innerText=record
    document.getElementById("puntaje2").innerText=puntaje
}
recordPuntaje()