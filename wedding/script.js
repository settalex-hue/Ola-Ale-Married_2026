// ==========================================
// SICUREZZA INIZIALE EMAILJS
// ==========================================
try {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("uml8QCRY1Ba5qjr80");
  }
} catch (e) {
  console.warn("Libreria EmailJS bloccata (es. Adblocker). Le mail potrebbero non funzionare.");
}

// ==========================================
// VARIABILI GLOBALI
// ==========================================
const toast = document.getElementById("toast");
const rsvpForm = document.getElementById("rsvpForm");

// ==========================================
// GESTIONE COUNTDOWN (Allineato a 11:30)
// ==========================================
const targetDate = new Date("2026-09-26T11:30:00").getTime();

function updateCountdown() {
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  if (!dEl || !hEl || !mEl || !sEl) return;

  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    dEl.innerText = "00";
    hEl.innerText = "00";
    mEl.innerText = "00";
    sEl.innerText = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  dEl.innerText = String(days).padStart(2, "0");
  hEl.innerText = String(hours).padStart(2, "0");
  mEl.innerText = String(minutes).padStart(2, "0");
  sEl.innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// FUNZIONE CALENDARIO (SAVE THE DATE)
// ==========================================
function aggiungiAlCalendario() {
  const titolo = "Matrimonio Aleksandra & Alessandro";
  const luogo = "Cattedrale di S.Paolo - Civita, Alatri";
  const descrizione = "Non mancare al nostro giorno speciale!";
  const dataInizio = "20260926T113000";
  const dataFine = "20260926T235900";

  const icsMSG = "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "BEGIN:VEVENT\n" +
    "DTSTART:" + dataInizio + "\n" +
    "DTEND:" + dataFine + "\n" +
    "SUMMARY:" + titolo + "\n" +
    "LOCATION:" + luogo + "\n" +
    "DESCRIPTION:" + descrizione + "\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  const blob = new Blob([icsMSG], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'matrimonio-A-A.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Evento scaricato!");
}

const saveDateBtn = document.querySelector(".home-button");
if (saveDateBtn) {
  saveDateBtn.addEventListener("click", aggiungiAlCalendario);
}

// ==========================================
// GESTIONE RSVP CON EMAILJS
// ==========================================
if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const btn = rsvpForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Invio in corso...";
    btn.disabled = true;

    if (typeof emailjs === 'undefined') {
      alert("Servizio email attualmente bloccato. Riprova disattivando l'adblocker.");
      btn.innerText = originalText;
      btn.disabled = false;
      return;