const envelopeIntro = document.getElementById("envelopeIntro");
const sealButton = document.getElementById("sealButton");
const toast = document.getElementById("toast");
const guestbookForm = document.getElementById("guestbookForm");
const messageList = document.getElementById("messageList");
const rsvpForm = document.getElementById("rsvpForm");
const homeSection = document.getElementById("home");
let introAnimated = false;

const targetDate = new Date("2026-09-26T11:00:00");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

function openEnvelope() {
  if (introAnimated) return;
  introAnimated = true;
  envelopeIntro.classList.add("open");
  sealButton.style.pointerEvents = "none";

  setTimeout(() => {
    const letter = document.querySelector(".letter");
    if (letter) {
      letter.classList.add("visible");
    }
  }, 1000);

  setTimeout(() => {
    envelopeIntro.classList.add("closing");
    setTimeout(() => {
      envelopeIntro.style.display = "none";
    }, 800);
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 4500);
}

sealButton.addEventListener("click", openEnvelope);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function loadGuestMessages() {
  const saved = localStorage.getItem("guestbookMessages");
  if (!saved) return;
  const messages = JSON.parse(saved);
  messageList.innerHTML = messages
    .map(
      (item) =>
        `<div class="guestbook-message"><strong>${item.name}</strong><p>${item.message}</p></div>`
    )
    .join("");
}

function saveGuestMessage(name, message) {
  const saved = localStorage.getItem("guestbookMessages");
  const messages = saved ? JSON.parse(saved) : [];
  messages.unshift({ name, message, date: new Date().toISOString() });
  localStorage.setItem("guestbookMessages", JSON.stringify(messages.slice(0, 10)));
  loadGuestMessages();
}

guestbookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(guestbookForm);
  const name = formData.get("guestName").trim();
  const message = formData.get("guestMessage").trim();
  if (!name || !message) return;
  saveGuestMessage(name, message);
  guestbookForm.reset();
  showToast("Messaggio inviato con successo!");
});

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("RSVP inviato, grazie!");
  rsvpForm.reset();
});

loadGuestMessages();

const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.hash.startsWith("#")) {
      event.preventDefault();
      document.querySelector(link.hash).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Traduzioni
const translations = {
  it: {
    home: "Home",
    location: "Location",
    programma: "Programma",
    rsvp: "RSVP",
    foto: "Foto",
    guestbook: "Guestbook",
    heroSubtitle: "Il matrimonio di",
    heroTitle: "Aleksandra & Alessandro",
    heroDate: "26 Settembre 2026",
    heroTime: "Ore 11:00",
    days: "giorni",
    hours: "ore",
    minutes: "minuti",
    seconds: "secondi",
    saveDate: "Save the Date",
    locationTitle: "Location",
    locationDesc: "Dove celebreremo il nostro amore",
    programmaTitle: "Programma",
    programmaDesc: "La giornata più bella",
    cerimonia: "Cerimonia",
    cerimoniaDesc: "Scambio delle promesse",
    aperitivo: "Aperitivo",
    aperitivoDesc: "Brindisi e stuzzichini",
    pranzo: "Pranzo di nozze",
    pranzoDesc: "Banchetto nuziale",
    torta: "Taglio della torta",
    tortaDesc: "Dolce momento insieme",
    rsvpTitle: "RSVP",
    rsvpDesc: "Conferma la tua presenza",
    nome: "Nome e Cognome",
    nomePlaceholder: "Inserisci il tuo nome",
    email: "Email",
    emailPlaceholder: "email@example.com",
    partecipi: "Parteciperai?",
    si: "Sì, ci sarò!",
    no: "Purtroppo non potrò",
    ospiti: "Numero di ospiti",
    allergie: "Allergie o diete speciali",
    allergiePlaceholder: "Es: vegetariano, celiaco, allergie...",
    messaggio: "Un messaggio per gli sposi",
    messaggioPlaceholder: "Scrivi un pensiero...",
    invia: "Invia conferma",
    grazie: "Grazie! Riceverai presto un messaggio di conferma.",
    portamiLi: "Portami lì",
    fotoTitle: "Condividi le Foto",
    fotoDesc: "Cattura i momenti magici",
    fotoText: "Scansiona il QR code per caricare le tue foto direttamente nel nostro cloud condiviso. Ogni momento conta!",
    scansiona: "Scansiona per caricare",
    guestbookTitle: "Guestbook",
    guestbookDesc: "Lascia un pensiero",
    tuoNome: "Il tuo nome",
    tuoNomePlaceholder: "Il tuo nome",
    scriviMessaggio: "Scrivi il tuo messaggio agli sposi...",
    lasciaMessaggio: "Lascia il tuo messaggio",
    primo: "Sii il primo a lasciare un messaggio!",
    dressCode: "Dress Code",
    comeVestirsi: "Come vestirsi",
    elegante: "Elegante formale",
    abito: "Abito lungo o midi per le signore, completo scuro per i signori",
    colori: "Colori consigliati",
    tonalita: "Tonalità pastello, verde salvia, beige, rosa cipria. Evitare il bianco (riservato alla sposa)",
    alloggio: "Alloggio",
    doveSoggiornare: "Dove soggiornare",
    strutture: "Le strutture convenzionate saranno disponibili a breve",
    cosaAspettarsi: "Cosa Aspettarsi",
    matrimonio: "Un matrimonio italo-polacco",
    paneSale: "Pane e Sale",
    paneDesc: "Tradizione polacca di benvenuto agli sposi con pane (prosperità) e sale (protezione dalle difficoltà)",
    tradizioniPolacche: "TRADIZIONI POLACCHE",
    pranzoItaliano: "Il pranzo italiano",
    pranzoItalianoDesc: "Preparatevi per un banchetto con antipasti, primi, secondi e dolci. Il pasto italiano è un'esperienza lunga e conviviale!",
    tradizioniItaliane: "TRADIZIONI ITALIANE",
    vodka: "Vodka",
    vodkaDesc: "Tradizione polacca del brindisi: 'Na zdrowie!' (Alla salute!) - preparatevi a festeggiare con i classici shot polacchi",
    toast: "Messaggio inviato con successo!"
  },
  pl: {
    home: "Dom",
    location: "Lokalizacja",
    programma: "Program",
    rsvp: "RSVP",
    foto: "Zdjęcia",
    guestbook: "Księga gości",
    heroSubtitle: "Ślub",
    heroTitle: "Aleksandra & Alessandro",
    heroDate: "26 września 2026",
    heroTime: "Godzina 11:00",
    days: "dni",
    hours: "godziny",
    minutes: "minuty",
    seconds: "sekundy",
    saveDate: "Zapisz datę",
    locationTitle: "Lokalizacja",
    locationDesc: "Gdzie będziemy świętować naszą miłość",
    programmaTitle: "Program",
    programmaDesc: "Najpiękniejszy dzień",
    cerimonia: "Ceremonia",
    cerimoniaDesc: "Wymiana przysiąg",
    aperitivo: "Aperitif",
    aperitivoDesc: "Tosty i przekąski",
    pranzo: "Obiad weselny",
    pranzoDesc: "Uroczysta kolacja",
    torta: "Krojenie tortu",
    tortaDesc: "Słodki moment razem",
    rsvpTitle: "RSVP",
    rsvpDesc: "Potwierdź swoją obecność",
    nome: "Imię i nazwisko",
    nomePlaceholder: "Wprowadź swoje imię",
    email: "Email",
    emailPlaceholder: "email@example.com",
    partecipi: "Czy będziesz uczestniczyć?",
    si: "Tak, będę ta!",
    no: "Niestety nie będę mógł",
    ospiti: "Liczba gości",
    allergie: "Alergie lub specjalne diety",
    allergiePlaceholder: "Np: wegetarianin, celiak, alergie...",
    messaggio: "Wiadomość dla nowożeńców",
    messaggioPlaceholder: "Napisz myśl...",
    invia: "Wyślij potwierdzenie",
    grazie: "Dziękujemy! Wkrótce otrzymasz wiadomość potwierdzającą.",
    portamiLi: "Zabierz mnie tam",
    fotoTitle: "Udostępnij zdjęcia",
    fotoDesc: "Uchwyć magiczne momenty",
    fotoText: "Zeskanuj kod QR, aby przesłać swoje zdjęcia bezpośrednio do naszego wspólnego chmury. Każdy moment się liczy!",
    scansiona: "Zeskanuj, aby przesłać",
    guestbookTitle: "Księga gości",
    guestbookDesc: "Zostaw myśl",
    tuoNome: "Twoje imię",
    tuoNomePlaceholder: "Twoje imię",
    scriviMessaggio: "Napisz swoją wiadomość do nowożeńców...",
    lasciaMessaggio: "Zostaw swoją wiadomość",
    primo: "Bądź pierwszy, który zostawi wiadomość!",
    dressCode: "Dress Code",
    comeVestirsi: "Jak się ubrać",
    elegante: "Elegancki formalny",
    abito: "Długa sukienka lub midi dla pań, ciemny garnitur dla panów",
    colori: "Zalecane kolory",
    tonalita: "Pastelowe odcienie, szałwia zielona, beż, róż cipria. Unikaj bieli (zarezerwowanej dla panny młodej)",
    alloggio: "Zakwaterowanie",
    doveSoggiornare: "Gdzie się zatrzymać",
    strutture: "Struktury partnerskie będą dostępne wkrótce",
    cosaAspettarsi: "Czego się spodziewać",
    matrimonio: "Włosko-polskie wesele",
    paneSale: "Chleb i sól",
    paneDesc: "Polska tradycja powitania nowożeńców chlebem (prosperity) i solą (ochrona przed trudnościami)",
    tradizioniPolacche: "POLSKIE TRADYCJE",
    pranzoItaliano: "Włoski obiad",
    pranzoItalianoDesc: "Przygotujcie się na ucztę z przystawkami, pierwszymi, drugimi i deserami. Włoski posiłek to długie i towarzyskie doświadczenie!",
    tradizioniItaliane: "WŁOSKIE TRADYCJE",
    vodka: "Wódka",
    vodkaDesc: "Polska tradycja toastu: 'Na zdrowie!' (Na zdrowie!) - przygotujcie się na świętowanie z klasycznymi polskimi shotami",
    toast: "Wiadomość wysłana pomyślnie!"
  }
};

let currentLang = 'it'; // Default italiano

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Nav
  document.querySelector('a[href="#home"]').textContent = t.home;
  document.querySelector('a[href="#location"]').textContent = t.location;
  document.querySelector('a[href="#programma"]').textContent = t.programma;
  document.querySelector('a[href="#rsvp"]').textContent = t.rsvp;
  document.querySelector('a[href="#foto"]').textContent = t.foto;
  document.querySelector('a[href="#guestbook"]').textContent = t.guestbook;

  // Hero
  document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
  document.querySelector('.hero-title').textContent = t.heroTitle;
  document.querySelector('.hero-date span:first-child').textContent = t.heroDate;
  document.querySelector('.hero-date span:last-child').textContent = t.heroTime;
  document.querySelector('.hero-button').textContent = t.saveDate;

  // Countdown labels
  document.querySelector('#countdown span:nth-child(1)').innerHTML = `<strong id="days">${daysEl.textContent}</strong> ${t.days}`;
  document.querySelector('#countdown span:nth-child(2)').innerHTML = `<strong id="hours">${hoursEl.textContent}</strong> ${t.hours}`;
  document.querySelector('#countdown span:nth-child(3)').innerHTML = `<strong id="minutes">${minutesEl.textContent}</strong> ${t.minutes}`;
  document.querySelector('#countdown span:nth-child(4)').innerHTML = `<strong id="seconds">${secondsEl.textContent}</strong> ${t.seconds}`;

  // Location
  document.querySelector('#location .section-intro h2').textContent = t.locationTitle;
  document.querySelector('#location .section-intro p').textContent = t.locationDesc;
  document.querySelector('#location .button').textContent = t.portamiLi;

  // Programma
  document.querySelector('#programma .section-intro h2').textContent = t.programmaTitle;
  document.querySelector('#programma .section-intro p').textContent = t.programmaDesc;
  document.querySelector('#programma .timeline-event:nth-child(1) h3').textContent = t.cerimonia;
  document.querySelector('#programma .timeline-event:nth-child(1) p').textContent = t.cerimoniaDesc;
  document.querySelector('#programma .timeline-event:nth-child(2) h3').textContent = t.aperitivo;
  document.querySelector('#programma .timeline-event:nth-child(2) p').textContent = t.aperitivoDesc;
  document.querySelector('#programma .timeline-event:nth-child(3) h3').textContent = t.pranzo;
  document.querySelector('#programma .timeline-event:nth-child(3) p').textContent = t.pranzoDesc;
  document.querySelector('#programma .timeline-event:nth-child(4) h3').textContent = t.torta;
  document.querySelector('#programma .timeline-event:nth-child(4) p').textContent = t.tortaDesc;

  // RSVP
  document.querySelector('#rsvp .section-intro h2').textContent = t.rsvpTitle;
  document.querySelector('#rsvp .section-intro p').textContent = t.rsvpDesc;
  document.querySelector('#rsvpForm .field-row:first-of-type label:first-of-type span').textContent = t.nome;
  document.querySelector('#rsvpForm input[name="name"]').placeholder = t.nomePlaceholder;
  document.querySelector('#rsvpForm .field-row:first-of-type label:nth-of-type(2) span').textContent = t.email;
  document.querySelector('#rsvpForm input[name="email"]').placeholder = t.emailPlaceholder;
  document.querySelector('#rsvpForm .radio-row span').textContent = t.partecipi;
  document.querySelector('#rsvpForm .radio-row label:first-of-type span').textContent = t.si;
  document.querySelector('#rsvpForm .radio-row label:nth-of-type(2) span').textContent = t.no;
  document.querySelector('#rsvpForm > label:nth-child(3) span').textContent = t.ospiti;
  document.querySelector('#rsvpForm > label:nth-child(4) span').textContent = t.allergie;
  document.querySelector('#rsvpForm input[name="diet"]').placeholder = t.allergiePlaceholder;
  document.querySelector('#rsvpForm > label:nth-child(5) span').textContent = t.messaggio;
  document.querySelector('#rsvpForm textarea[name="message"]').placeholder = t.messaggioPlaceholder;
  document.querySelector('#rsvpForm button[type="submit"]').textContent = t.invia;
  document.querySelector('#rsvpForm .form-note').textContent = t.grazie;

  // Foto
  document.querySelector('#foto .section-intro h2').textContent = t.fotoTitle;
  document.querySelector('#foto .section-intro p').textContent = t.fotoDesc;
  document.querySelector('#foto .foto-card p').textContent = t.fotoText;
  document.querySelector('#foto .caption').textContent = t.scansiona;

  // Guestbook
  document.querySelector('#guestbook .section-intro h2').textContent = t.guestbookTitle;
  document.querySelector('#guestbook .section-intro p').textContent = t.guestbookDesc;
  document.querySelector('#guestbookForm label:first-child span').textContent = t.tuoNome;
  document.querySelector('#guestbookForm input[name="guestName"]').placeholder = t.tuoNomePlaceholder;
  document.querySelector('#guestbookForm label:nth-child(2) span').textContent = t.scriviMessaggio;
  document.querySelector('#guestbookForm textarea[name="guestMessage"]').placeholder = t.scriviMessaggio;
  document.querySelector('#guestbookForm button[type="submit"]').textContent = t.lasciaMessaggio;
  document.querySelector('.guestbook-note p').textContent = t.primo;

  // Info
  document.querySelector('.info-card:nth-child(1) h3').textContent = t.dressCode;
  document.querySelector('.info-card:nth-child(1) p:nth-child(3)').textContent = t.comeVestirsi;
  document.querySelector('.info-card:nth-child(1) strong:nth-child(4)').textContent = t.elegante;
  document.querySelector('.info-card:nth-child(1) p:nth-child(5)').textContent = t.abito;
  document.querySelector('.info-card:nth-child(1) strong:nth-child(6)').textContent = t.colori;
  document.querySelector('.info-card:nth-child(1) p:nth-child(7)').textContent = t.tonalita;
  document.querySelector('.info-card:nth-child(2) h3').textContent = t.alloggio;
  document.querySelector('.info-card:nth-child(2) p:nth-child(3)').textContent = t.doveSoggiornare;
  document.querySelector('.alloggio-note p').textContent = t.strutture;

  // Finale
  document.querySelector('.section-finale .section-intro h2').textContent = t.cosaAspettarsi;
  document.querySelector('.section-finale .section-intro p').textContent = t.matrimonio;
  document.querySelector('.final-card:nth-child(1) h3').textContent = t.paneSale;
  document.querySelector('.final-card:nth-child(1) p').textContent = t.paneDesc;
  document.querySelector('.final-card:nth-child(1) span').textContent = t.tradizioniPolacche;
  document.querySelector('.final-card:nth-child(2) h3').textContent = t.pranzoItaliano;
  document.querySelector('.final-card:nth-child(2) p').textContent = t.pranzoItalianoDesc;
  document.querySelector('.final-card:nth-child(2) span').textContent = t.tradizioniItaliane;
  document.querySelector('.final-card:nth-child(3) h3').textContent = t.vodka;
  document.querySelector('.final-card:nth-child(3) p').textContent = t.vodkaDesc;
  document.querySelector('.final-card:nth-child(3) span').textContent = t.tradizioniPolacche;

  // Toast
  toast.textContent = t.toast;

  // Aggiorna active button
  document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
  if (lang === 'it') {
    document.querySelector('.lang-switcher button:first-child').classList.add('active');
  } else {
    document.querySelector('.lang-switcher button:last-child').classList.add('active');
  }
}

// Event listeners per i button lingua
document.querySelector('.lang-switcher button:first-child').addEventListener('click', () => setLanguage('it'));
document.querySelector('.lang-switcher button:last-child').addEventListener('click', () => setLanguage('pl'));

// Inizializza con italiano
setLanguage('it');
