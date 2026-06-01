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
const sealButton = document.getElementById("sealButton");
const toast = document.getElementById("toast");
const messageList = document.getElementById("messageList");
const rsvpForm = document.getElementById("rsvpForm");
const homeSection = document.getElementById("home");
let introAnimated = false;

// ==========================================
// GESTIONE COUNTDOWN (Reso Anti-Blocco)
// ==========================================
const targetDate = new Date("2026-09-26T11:00:00").getTime();

function updateCountdown() {
  // Peschiamo gli elementi ogni secondo, così anche se cambiano lingua, non si rompono
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
    }

    emailjs.sendForm('service_pgxk1rn', 'template_6icii1d', rsvpForm)
      .then(() => {
        showToast("RSVP inviato, grazie!");
        rsvpForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, (err) => {
        alert("Errore nell'invio: " + JSON.stringify(err));
        btn.innerText = "Riprova";
        btn.disabled = false;
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
  setTimeout(() => toast.classList.remove("show"), 2600);
}

// ==========================================
// SCROLL MORBIDO NAVIGAZIONE
// ==========================================
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.hash.startsWith("#")) {
      event.preventDefault();
      const target = document.querySelector(link.hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ==========================================
// TRADUZIONI CON SISTEMA ANTI-CRASH
// ==========================================
const translations = {
  it: {
    home: "Home", location: "Location", programma: "Programma", rsvp: "RSVP", foto: "Foto",
    homeSubtitle: "Il matrimonio di", homeTitle: "Aleksandra & Alessandro", homeDate: "26 Settembre 2026", homeTime: "Ore 11:00",
    days: "giorni", hours: "ore", minutes: "minuti", seconds: "secondi", saveDate: "Save the Date",
    locationTitle: "Location", locationDesc: "Dove celebreremo il nostro amore",
    programmaTitle: "Programma", programmaDesc: "La giornata più bella", cerimonia: "Cerimonia", cerimoniaDesc: "Scambio delle promesse",
    aperitivo: "Aperitivo", aperitivoDesc: "Brindisi e stuzzichini", pranzo: "Pranzo di nozze", pranzoDesc: "Banchetto nuziale",
    torta: "Taglio della torta", tortaDesc: "Dolce momento insieme",
    rsvpTitle: "RSVP", rsvpDesc: "Conferma la tua presenza", nome: "Nome e Cognome", nomePlaceholder: "Inserisci il tuo nome",
    email: "Email", emailPlaceholder: "email@example.com", partecipi: "Parteciperai?", si: "Sì, ci sarò!", no: "Purtroppo non potrò",
    ospiti: "Numero di ospiti", allergie: "Allergie o diete speciali", allergiePlaceholder: "Es: vegetariano, celiaco, allergie...",
    messaggio: "Un messaggio per gli sposi", messaggioPlaceholder: "Scrivi un pensiero...", invia: "Invia conferma", grazie: "Grazie! Riceverai presto un messaggio di conferma.",
    portamiLi: "Portami lì", fotoTitle: "Condividi le Foto", fotoDesc: "Cattura i momenti magici", fotoText: "Scansiona il QR code per caricare le tue foto direttamente nel nostro cloud condiviso. Ogni momento conta!",
    scansiona: "Scansiona per caricare",
    alloggio: "Alloggio", doveSoggiornare: "Dove soggiornare", strutture: "Le strutture convenzionate saranno disponibili a breve",
    cosaAspettarsi: "Cosa Aspettarsi", matrimonio: "Un matrimonio italo-polacco", paneSale: "Pane e Sale", paneDesc: "Tradizione polacca di benvenuto agli sposi con pane (prosperità) e sale (protezione dalle difficoltà)",
    tradizioniPolacche: "TRADIZIONI POLACCHE", pranzoItaliano: "Il pranzo italiano", pranzoItalianoDesc: "Preparatevi per un banchetto con antipasti, primi, secondi e dolci. Il pasto italiano è un'esperienza lunga e conviviale!",
    tradizioniItaliane: "TRADIZIONI ITALIANE", vodka: "Vodka", vodkaDesc: "Tradizione polacca del brindisi: 'Na zdrowie!' (Alla salute!) - preparatevi a festeggiare con i classici shot polacchi",
  },
  pl: {
    home: "Dom", location: "Lokalizacja", programma: "Program", rsvp: "RSVP", foto: "Zdjęcia", guestbook: "Księga gości",
    homeSubtitle: "Ślub", homeTitle: "Aleksandra & Alessandro", homeDate: "26 Września 2026", homeTime: "Godzina 11:00",
    days: "dni", hours: "godziny", minutes: "minuty", seconds: "sekundy", saveDate: "Zapisz datę",
    locationTitle: "Lokalizacja", locationDesc: "Gdzie będziemy świętować naszą miłość",
    programmaTitle: "Program", programmaDesc: "Najpiękniejszy dzień", cerimonia: "Ceremonia", cerimoniaDesc: "Wymiana przysiąg",
    aperitivo: "Aperitif", aperitivoDesc: "Tosty i przekąski", pranzo: "Obiad weselny", pranzoDesc: "Uroczysta kolacja",
    torta: "Krojenie tortu", tortaDesc: "Słodki moment razem",
    rsvpTitle: "RSVP", rsvpDesc: "Potwierdź swoją obecność", nome: "Imię i nazwisko", nomePlaceholder: "Wprowadź swoje imię",
    email: "Email", emailPlaceholder: "email@example.com", partecipi: "Czy będziesz uczestniczyć?", si: "Tak, będę!", no: "Niestety nie będę mógł",
    ospiti: "Liczba gości", allergie: "Alergie lub specjalne diety", allergiePlaceholder: "Np: wegetarianin, celiak, alergie...",
    messaggio: "Wiadomość dla nowożeńców", messaggioPlaceholder: "Napisz myśl...", invia: "Wyślij potwierdzenie", grazie: "Dziękujemy! Wkrótce otrzymasz wiadomość potwierdzającą.",
    portamiLi: "Zabierz mnie tam", fotoTitle: "Udostępnij zdjęcia", fotoDesc: "Uchwyć magiczne momenty", fotoText: "Zeskanuj kod QR, aby przesłać swoje zdjęcia bezpośrednio do naszego wspólnego chmury. Każdy moment się liczy!",
    scansiona: "Zeskanuj, aby przesłać",
    dressCode: "Dress Code", comeVestirsi: "Jak się ubrać", elegante: "Elegancki formalny", abito: "Długa sukienka lub midi dla pań, ciemny garnitur dla panów",
    colori: "Zalecane kolory", tonalita: "Pastelowe odcienie, szałwia zielona, beż, róż cipria. Unikaj bieli (zarezerwowanej dla panny młodej)",
    alloggio: "Zakwaterowanie", doveSoggiornare: "Gdzie się zatrzymać", strutture: "Struktury partnerskie będą dostępne wkrótce",
    cosaAspettarsi: "Czego się spodziewać", matrimonio: "Włosko-polskie wesele", paneSale: "Chleb i sól", paneDesc: "Polska tradycja powitania nowożeńców chlebem (prosperity) i solą (ochrona przed trudnościami)",
    tradizioniPolacche: "POLSKIE TRADYCJE", pranzoItaliano: "Włoski obiad", pranzoItalianoDesc: "Przygotujcie się na ucztę z przystawkami, pierwszymi, drugimi i deserami. Włoski posiłek to długie i towarzyskie doświadczenie!",
    tradizioniItaliane: "WŁOSKIE TRADYCJE", vodka: "Wódka", vodkaDesc: "Polska tradycja toastu: 'Na zdrowie!' (Na zdrowie!) - przygotujcie się na świętowanie z klasycznymi polskimi shotami",
  }
};

function safeSetText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function safeSetPlaceholder(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.placeholder = text;
}

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  try {
    // Navigazione
    safeSetText('a[href="#home"]', t.home);
    safeSetText('a[href="#location"]', t.location);
    safeSetText('a[href="#programma"]', t.programma);
    safeSetText('a[href="#rsvp"]', t.rsvp);
    safeSetText('a[href="#foto"]', t.foto);
    safeSetText('a[href="#guestbook"]', t.guestbook);

    // home e Countdown
    safeSetText('.home-subtitle', t.homeSubtitle);
    safeSetText('.home-title', t.homeTitle);
    safeSetText('.home-date span:first-child', t.homeDate);
    safeSetText('.home-date span:nth-child(2)', t.homeTime);
    safeSetText('.home-button', t.saveDate);
    safeSetText('#label-days', t.days);
    safeSetText('#label-hours', t.hours);
    safeSetText('#label-minutes', t.minutes);
    safeSetText('#label-seconds', t.seconds);

    // Location
    safeSetText('#location .section-intro h2', t.locationTitle);
    safeSetText('#location .section-intro p', t.locationDesc);
    safeSetText('#location .button', t.portamiLi);

    // Programma
    safeSetText('#programma .section-intro h2', t.programmaTitle);
    safeSetText('#programma .section-intro p', t.programmaDesc);
    safeSetText('#programma .timeline-event:nth-child(1) h3', t.cerimonia);
    safeSetText('#programma .timeline-event:nth-child(1) p', t.cerimoniaDesc);
    safeSetText('#programma .timeline-event:nth-child(2) h3', t.aperitivo);
    safeSetText('#programma .timeline-event:nth-child(2) p', t.aperitivoDesc);
    safeSetText('#programma .timeline-event:nth-child(3) h3', t.pranzo);
    safeSetText('#programma .timeline-event:nth-child(3) p', t.pranzoDesc);
    safeSetText('#programma .timeline-event:nth-child(4) h3', t.torta);
    safeSetText('#programma .timeline-event:nth-child(4) p', t.tortaDesc);

    // RSVP
    safeSetText('#rsvp .section-intro h2', t.rsvpTitle);
    safeSetText('#rsvp .section-intro p', t.rsvpDesc);
    safeSetText('#rsvpForm .field-row:first-of-type label:first-of-type span', t.nome);
    safeSetPlaceholder('#rsvpForm input[name="name"]', t.nomePlaceholder);
    safeSetText('#rsvpForm .field-row:first-of-type label:nth-of-type(2) span', t.email);
    safeSetPlaceholder('#rsvpForm input[name="email"]', t.emailPlaceholder);
    safeSetText('#rsvpForm .radio-row span', t.partecipi);
    safeSetText('#rsvpForm .radio-row label:first-of-type span', t.si);
    safeSetText('#rsvpForm .radio-row label:nth-of-type(2) span', t.no);
    safeSetText('#rsvpForm > label:nth-child(3) span', t.ospiti);
    safeSetText('#rsvpForm > label:nth-child(4) span', t.allergie);
    safeSetPlaceholder('#rsvpForm input[name="diet"]', t.allergiePlaceholder);
    safeSetText('#rsvpForm > label:nth-child(5) span', t.messaggio);
    safeSetPlaceholder('#rsvpForm textarea[name="message"]', t.messaggioPlaceholder);
    safeSetText('#rsvpForm button[type="submit"]', t.invia);
    safeSetText('#rsvpForm .form-note', t.grazie);

    // Foto
    safeSetText('#foto .section-intro h2', t.fotoTitle);
    safeSetText('#foto .section-intro p', t.fotoDesc);
    safeSetText('#foto .foto-card p', t.fotoText);
    safeSetText('#foto .caption', t.scansiona);

    // Guestbook
    safeSetText('#guestbook .section-intro h2', t.guestbookTitle);
    safeSetText('#guestbook .section-intro p', t.guestbookDesc);
    safeSetText('#guestbookForm label:first-child span', t.tuoNome);
    safeSetPlaceholder('#guestbookForm input[name="guestName"]', t.tuoNomePlaceholder);
    safeSetText('#guestbookForm label:nth-child(2) span', t.scriviMessaggio);
    safeSetPlaceholder('#guestbookForm textarea[name="guestMessage"]', t.scriviMessaggio);
    safeSetText('#guestbookForm button[type="submit"]', t.lasciaMessaggio);
    safeSetText('.guestbook-note p', t.primo);

    // Info
    safeSetText('.info-card:nth-child(1) h3', t.alloggio);
    safeSetText('.info-card:nth-child(1) p:nth-child(3)', t.doveSoggiornare);
    safeSetText('.alloggio-note p', t.strutture);

    // Finale
    safeSetText('.section-finale .section-intro h2', t.cosaAspettarsi);
    safeSetText('.section-finale .section-intro p', t.matrimonio);
    safeSetText('.final-card:nth-child(1) h3', t.paneSale);
    safeSetText('.final-card:nth-child(1) p', t.paneDesc);
    safeSetText('.final-card:nth-child(1) span', t.tradizioniPolacche);
    safeSetText('.final-card:nth-child(2) h3', t.pranzoItaliano);
    safeSetText('.final-card:nth-child(2) p', t.pranzoItalianoDesc);
    safeSetText('.final-card:nth-child(2) span', t.tradizioniItaliane);
    safeSetText('.final-card:nth-child(3) h3', t.vodka);
    safeSetText('.final-card:nth-child(3) p', t.vodkaDesc);
    safeSetText('.final-card:nth-child(3) span', t.tradizioniPolacche);
  } catch (error) {
    console.error("Errore durante la traduzione", error);
  }

  // Aggiorna active button
  document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
  const firstBtn = document.querySelector('.lang-switcher button:first-child');
  const lastBtn = document.querySelector('.lang-switcher button:last-child');

  if (lang === 'it' && firstBtn) firstBtn.classList.add('active');
  if (lang === 'pl' && lastBtn) lastBtn.classList.add('active');
}

// Inizializza pulsanti lingua
const btnIt = document.querySelector('.lang-switcher button:first-child');
const btnPl = document.querySelector('.lang-switcher button:last-child');
if (btnIt) btnIt.addEventListener('click', () => setLanguage('it'));
if (btnPl) btnPl.addEventListener('click', () => setLanguage('pl'));

// Avvia italiano di default
setLanguage('it');