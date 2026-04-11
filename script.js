// ==========================================
// SICUREZZA INIZIALE EMAILJS
// ==========================================
// Inizializziamo EmailJS all'inizio, ma con un try/catch
// così se l'adblocker lo blocca, il resto del sito funziona.
try {
  // Sostituisci "YOUR_PUBLIC_KEY" con la tua Public Key reale di EmailJS
  emailjs.init("uml8QCRY1Ba5qjr80"); 
} catch (e) {
  console.warn("EmailJS non inizializzato (probabilmente bloccato da AdBlock). L'invio RSVP potrebbe non funzionare.");
}

// ==========================================
// VARIABILI GLOBALI E DOM
// ==========================================
const envelopeIntro = document.getElementById("envelopeIntro");
const sealButton = document.getElementById("sealButton");
const letter = document.querySelector(".letter");
const siteShell = document.querySelector(".site-shell");
const toast = document.getElementById("toast");
const guestbookForm = document.getElementById("guestbookForm");
const messageList = document.getElementById("messageList");
const rsvpForm = document.getElementById("rsvpForm");

let introAnimated = false; // Flag per evitare doppie animazioni

// ==========================================
// GESTIONE ANIMAZIONE BUSTA (CORRETTA)
// ==========================================
function openEnvelope() {
  if (introAnimated) return; // Evita di rieseguire se già cliccato
  introAnimated = true;
  
  // 1. Apri la busta (JavaScript aggiunge la classe CSS)
  if (envelopeIntro) {
    envelopeIntro.classList.add("open");
  }

  // 2. Fai emergere il biglietto (dopo 1 secondo)
  setTimeout(() => {
    if (letter) {
      letter.classList.add("visible");
    }
  }, 1000);

  // 3. Nascondi l'intro e mostra la Home (dopo 4.5 secondi totali)
  setTimeout(() => {
    if (envelopeIntro) {
      envelopeIntro.classList.add("closing");
    }
    
    // Mostriamo la Home
    if (siteShell) {
      siteShell.classList.add("visible");
    }

    // Scrolliamo dolcemente verso la Home
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Rimuoviamo definitivamente l'intro dal DOM dopo la transizione CSS
    setTimeout(() => {
      if (envelopeIntro) envelopeIntro.style.display = "none";
    }, 800); // Durata della transizione 'closing'

  }, 4500);
}

// Aggiungiamo l'evento al sigillo
if (sealButton) {
  sealButton.addEventListener("click", openEnvelope);
}

// ==========================================
// GESTIONE COUNTDOWN
// ==========================================
const targetDate = new Date("2026-09-26T11:00:00").getTime();

function updateCountdown() {
  // Peschiamo gli elementi ogni secondo (resiste al cambio lingua)
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  if (!dEl || !hEl || !mEl || !sEl) return; // Sicurezza

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

// Avviamo il countdown subito e poi ogni secondo
updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// FUNZIONE SAVE THE DATE (Calendario)
// ==========================================
function aggiungiAlCalendario() {
  const titolo = "Matrimonio Aleksandra & Alessandro";
  const luogo = "Tenuta Il Sogno - Piglio, FR";
  const descrizione = "Non mancare al nostro giorno speciale!";
  const dataInizio = "20260926T110000"; 
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

// ==========================================
// GESTIONE RSVP CON EMAILJS (Anti-Blocco)
// ==========================================
if (rsvpForm) {
  rsvpForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Controllo se EmailJS è disponibile
    if (typeof emailjs === 'undefined') {
      alert("Il servizio di invio email è momentaneamente bloccato (probabilmente da un AdBlocker). Ti preghiamo di disattivarlo e riprovare, o di contattarci direttamente.");
      return;
    }

    const btn = rsvpForm.querySelector('button');
    if (btn) {
        btn.innerText = "Invio in corso...";
        btn.disabled = true;
    }

    // Sostituisci con i tuoi ID reali di EmailJS
    const serviceID = 'service_pgxk1rn';
    const templateID = 'template_mrbm77o';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        showToast("Conferma inviata correttamente!");
        rsvpForm.reset();
      }, (err) => {
        console.error("Errore EmailJS:", err);
        alert("Si è verificato un errore nell'invio. Riprova più tardi.");
      })
      .finally(() => {
        if (btn) {
            btn.innerText = "Invia conferma";
            btn.disabled = false;
        }
      });
  });
}

// ==========================================
// GESTIONE NOTIFICHE (TOAST)
// ==========================================
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ==========================================
// GUESTBOOK LOCALE (Anti-Blocco)
// ==========================================
function loadGuestMessages() {
  if (!messageList) return;
  try {
    const saved = localStorage.getItem("guestbookMessages");
    if (!saved) return;
    const messages = JSON.parse(saved);
    if (messages.length > 0) {
        messageList.innerHTML = messages
          .map(item => `<div class="guestbook-message"><strong>${item.name}</strong><p>${item.message}</p></div>`)
          .join("");
    }
  } catch(e) { console.warn("Impossibile caricare i messaggi del guestbook (localStorage disabilitato?)."); }
}

function saveGuestMessage(name, message) {
  try {
    const saved = localStorage.getItem("guestbookMessages");
    const messages = saved ? JSON.parse(saved) : [];
    messages.unshift({ name, message, date: new Date().toISOString() });
    localStorage.setItem("guestbookMessages", JSON.stringify(messages.slice(0, 50))); // Salviamo max 50 messaggi
    loadGuestMessages();
  } catch(e) { console.warn("Impossibile salvare il messaggio (localStorage pieno o disabilitato)."); }
}

if (guestbookForm) {
  guestbookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(guestbookForm);
    const name = formData.get("guestName");
    const message = formData.get("guestMessage");
    if (!name || !message || name.trim() === "" || message.trim() === "") {
        alert("Compila tutti i campi del guestbook.");
        return;
    }
    saveGuestMessage(name.trim(), message.trim());
    guestbookForm.reset();
    showToast("Messaggio aggiunto!");
  });
}

// Carichiamo i messaggi esistenti all'avvio
loadGuestMessages();

// ==========================================
// SCROLL MORBIDO NAVIGAZIONE (Anti-Blocco)
// ==========================================
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.hash;
    if (hash && hash.startsWith("#")) {
      event.preventDefault();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ==========================================
// TRADUZIONI (SISTEMA SICURO)
// ==========================================
const translations = {
  it: {
    home: "Home", location: "Location", programma: "Programma", rsvp: "RSVP", foto: "Foto", guestbook: "Guestbook",
    heroSubtitle: "Il matrimonio di", heroDate: "26 Settembre 2026", heroTime: "Ore 11:00",
    labelDays: "giorni", labelHours: "ore", labelMinutes: "minuti", labelSeconds: "secondi", saveDate: "Save the Date",
    confirmTitle: "Conferma la tua presenza",
    // Aggiungi qui altre traduzioni se necessario
  },
  pl: {
    home: "Dom", location: "Lokalizacja", programma: "Program", rsvp: "RSVP", foto: "Zdjęcia", guestbook: "Księga gości",
    heroSubtitle: "Ślub", heroDate: "26 września 2026", heroTime: "Godzina 11:00",
    labelDays: "dni", labelHours: "godziny", labelMinutes: "minuty", labelSeconds: "sekundy", saveDate: "Zapisz datę",
    confirmTitle: "Potwierdź obecność",
    // Aggiungi qui altre traduzioni se necessario
  }
};

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Navigazione
  document.querySelector('a[href="#home"]').textContent = t.home;
  document.querySelector('a[href="#location"]').textContent = t.location;
  document.querySelector('a[href="#programma"]').textContent = t.programma;
  document.querySelector('a[href="#rsvp"]').textContent = t.rsvp;
  document.querySelector('a[href="#foto"]').textContent = t.foto;
  document.querySelector('a[href="#guestbook"]').textContent = t.guestbook;

  // Hero
  document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
  document.querySelector('.hero-date span:first-child').textContent = t.heroDate;
  document.querySelector('.hero-date span:last-child').textContent = t.heroTime;
  document.querySelector('.hero-button').textContent = t.saveDate;

  // Countdown Labels (ID nel file index.html aggiornato)
  document.getElementById('label-days').textContent = t.labelDays;
  document.getElementById('label-hours').textContent = t.labelHours;
  document.getElementById('label-minutes').textContent = t.labelMinutes;
  document.getElementById('label-seconds').textContent = t.labelSeconds;

  // RSVP Title
  document.querySelector('#rsvp .section-intro p').textContent = t.confirmTitle;

  // Aggiorna bottoni lingua
  document.querySelectorAll('.lang-switcher button').forEach(b => b.classList.remove('active'));
  if (lang === 'it') document.querySelector('.lang-switcher button:first-child').classList.add('active');
  else document.querySelector('.lang-switcher button:last-child').classList.add('active');
}

// Inizializza pulsanti lingua con try/catch di sicurezza
try {
    document.querySelector('.lang-switcher button:first-child').addEventListener('click', () => setLanguage('it'));
    document.querySelector('.lang-switcher button:last-child').addEventListener('click', () => setLanguage('pl'));
} catch (e) {
    console.warn("Pulsanti lingua non trovati o non inizializzati.");
}

// Avviamo in italiano di default
setLanguage('it');
