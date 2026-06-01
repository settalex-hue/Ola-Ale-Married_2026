// ==========================================
// VARIABILI GLOBALI
// ==========================================
const envelope = document.getElementById("envelope");
let introAnimated = false;

// ==========================================
// GESTIONE ANIMAZIONE BUSTA
// ==========================================
function openEnvelope() {
  if (introAnimated) return;
  introAnimated = true;

  const sealClosed = envelope.querySelector(".envelope-seal-closed");
  const letter = envelope.querySelector(".letter");
  sealClosed.classList.add("opening");
  letter.classList.add("visible");

  setTimeout(() => {
    const sealOpened = envelope.querySelector(".envelope-seal-opened");
    sealOpened.classList.add("opening");

    setTimeout(() => {
      letter.classList.add("exiting");
      setTimeout(() => {
        window.location.assign('./wedding');
      }, 1000);
    }, 1000);

  }, 1000);
}

if (envelope) {
  envelope.addEventListener("click", openEnvelope);
}