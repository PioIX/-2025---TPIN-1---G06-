const musicFondo = document.getElementById("musicFondo");
const btnMute = document.getElementById("btnMute");

// Música empieza muteada y pausada
musicFondo.muted = true;
musicFondo.pause();

let musicaActiva = false;

btnMute.addEventListener("click", async () => {
  if (!musicaActiva) {
    // Activar música (desmutear y reproducir)
    musicFondo.muted = false;
    try {
      await musicFondo.play();
      musicaActiva = true;
      btnMute.textContent = "🔇 Mutear Música";
      musicFondo.volume = 0.2; // volumen al 20%

    } catch (err) {
      console.error("No se pudo reproducir la música:", err);
    }
  } else {
    // Pausar música y mutear
    musicFondo.pause();
    musicFondo.muted = true;
    musicaActiva = false;
    btnMute.textContent = "🎵 Activar Música";
  }
});
