// ==========================================
// VARIABILI GLOBALI
// ==========================================
const envelopeIntro = document.getElementById("envelopeIntro");
const sealButton = document.getElementById("sealButton");
let introAnimated = false;

// ==========================================
// GESTIONE ANIMAZIONE BUSTA
// ==========================================
function openEnvelope() {
  if (introAnimated) return;
  introAnimated = true;

  if (envelopeIntro) envelopeIntro.classList.add("open");
  if (sealButton) sealButton.style.pointerEvents = "none";

  setTimeout(() => {
    const letter = document.querySelector(".letter");
    if (letter) letter.classList.add("visible");
  }, 1000);

  setTimeout(() => {
    if (envelopeIntro) {
      envelopeIntro.classList.add("closing");
      setTimeout(() => {
        envelopeIntro.style.display = "none";
      }, 800);
    }
    window.location.assign('./wedding');
  }, 4500);
}

if (sealButton) {
  sealButton.addEventListener("click", openEnvelope);
}
