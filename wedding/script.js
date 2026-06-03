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
    navHome: "Home", navCerimonia: "Cerimonia", navLocation: "Location", navAlloggio: "Alloggio", 
    navAlatri: "Alatri", navProgramma: "Programma", navRsvp: "RSVP", navFoto: "Foto", navDati: "Dati",
    homeSubtitle: "Il matrimonio di", homeDate: "26 Settembre 2026", homeTime: "Ore 11:30", saveDate: "Save the Date",
    days: "giorni", hours: "ore", minutes: "minuti", seconds: "secondi",
    cerimoniaTitle: "Cerimonia", cerimoniaDesc: "Dove celebreremo il nostro amore", portamiLi: "Portami lì",
    locationTitle: "Location", locationDesc: "Dove festeggeremo",
    alloggioTitle: "Alloggio",
    alloggioText: "Per chi arriverà da fuori, abbiamo pensato ad alcune strutture convenzionate in zona, così da rendere l’organizzazione del soggiorno più semplice. Quando contattaterai la struttura, ricordati di indicare che parteciperai al nostro matrimonio: la convenzione sarà applicata, mentre la disponibilità delle camere resterà soggetta alle prenotazioni già ricevute. Ti consigliamo quindi di muoverti con un po’ di anticipo, così da scegliere con calma la soluzione più comoda.",
    alatriTitle: "Alatri",
    alatriText1: "Alatri è la città che ci ha visto crescere e il luogo in cui le nostre strade si sono incrociate per caso, per poi intrecciarsi per sempre. Sorge nel cuore della Ciociaria, una regione storica del Lazio meridionale fatta di tradizioni, folklore, borghi e sapori che parlano di casa. Se arriverai con un po’ di anticipo, ti consigliamo di scoprirla con calma e di lasciarti un momento per una pinta di birra al Guinness, dove tutto ebbe inizio.",
    alatriText2: "Per idee ed itinerari, puoi curiosare qui:",
    alatriLink: "Portale turismo Ciociaria",
    programmaTitle: "Programma", programmaDesc: "La giornata più bella",
    progCerimonia: "Cerimonia", progCerimoniaDesc: "Scambio delle promesse",
    progAperitivo: "Aperitivo", progAperitivoDesc: "Brindisi e stuzzichini",
    progPranzo: "Pranzo di nozze", progPranzoDesc: "Banchetto nuziale",
    progTorta: "Taglio della torta", progTortaDesc: "Dolce momento insieme",
    expectTitle: "Cosa Aspettarsi", expectSubtitle: "Un matrimonio italo-polacco",
    serenataTitle: "Serenata Folkloristica",
    serenataText: "Qualche sera prima del matrimonio daremo il via ai festeggiamenti con una serenata folkloristica, tra canti, musica e brindisi in compagnia. Non puoi mancare! Per i dettagli rivolgiti allo sposo… mi raccomando, è un segreto! 😉",
    pranzoTitle: "Il pranzo italiano", pranzoText: "Preparati per un banchetto all'italiana, un'esperienza lunga e conviviale!",
    vodkaTitle: "Vodka", vodkaText: "'Na zdrowie!' (Alla salute!) - partecipa al brindisi polacco a base di Vodka",
    rsvpTitle: "Répondez S’il Vous Plaît", rsvpDesc: "Conferma la tua presenza",
    nomeLabel: "Nome e Cognome", nomePlaceholder: "Inserisci il tuo nome",
    emailLabel: "Email", emailPlaceholder: "email@example.com",
    partecipiLabel: "Parteciperai?", si: "Sì, ci sarò!", no: "Purtroppo non potrò",
    ospitiLabel: "Numero di ospiti", allergieLabel: "Allergie o diete speciali",
    messaggioLabel: "Un messaggio per gli sposi", messaggioPlaceholder: "Scrivi un pensiero...", invia: "Invia conferma",
    fotoTitle: "Condividi le Foto", fotoDesc: "Cattura i momenti magici",
    fotoText: "Scansiona il QR code per caricare le foto direttamente nel nostro cloud condiviso. Ogni momento conta!",
    scansiona: "Scansiona per caricare",
    datiTitle: "Un pensiero per il nostro domani",
    datiText: "Se ti va di contribuire al nostro viaggio, ai nostri sogni o semplicemente a una birra sulla spiaggia, qui troverai le coordinate.",
    datiIntestato: "Intestato a: Alessandro Settanni",
    grazie: "Grazie di cuore ♡"
  },
  pl: {
    navHome: "Dom", navCerimonia: "Ceremonia", navLocation: "Wesele", navAlloggio: "Nocleg", 
    navAlatri: "Alatri", navProgramma: "Program", navRsvp: "Potwierdzenie", navFoto: "Zdjęcia", navDati: "Dane",
    homeSubtitle: "Ślub", homeDate: "26 Września 2026", homeTime: "Godzina 11:30", saveDate: "Zapisz datę",
    days: "dni", hours: "godziny", minutes: "minuty", seconds: "sekundy",
    cerimoniaTitle: "Ceremonia", cerimoniaDesc: "Cerimonia ślubna odbędzie się w", portamiLi: "Zabierz mnie tam",
    locationTitle: "Wesele", locationDesc: "Przyjęcie weselne odbędzie się w",
    alloggioTitle: "Nocleg",
    alloggioText: "Dla osób przybywających z daleka przygotowaliśmy kilka rekomendowanych obiektów w okolicy, aby ułatwić organizację pobytu. Kontaktując się z wybranym miejscem, pamiętaj o wspomnieniu, że jesteś gościem na naszym ślubie: zostanie naliczona zniżka, jednak dostępność pokoi zależy od wcześniejszych rezerwacji. Zalecamy więc rezerwację z wyprzedzeniem, aby spokojnie wybrać najwygodniejsze rozwiązanie.",
    alatriTitle: "Alatri",
    alatriText1: "Alatri, to miasto w którym dorastaliśmy. Miejsce, gdzie nasze ścieżki skrzyżowały się przez przypadek, by połączyć się na zawsze. Znajduje się w sercu Ciociarii -historycznego regionu południowego Lacjum- pełnego tradycji, folkloru, urokliwych miasteczek i smaków, które kojarzą się z domem. Jeśli przyjedziesz trochę wcześniej, polecamy spokojnie odkryć miasto i zatrzymać się na kufelek piwa w pubie Guinness, gdzie wszystko się zaczęło.",
    alatriText2: "Pomysły i plany podróży znajdziesz tutaj:",
    alatriLink: "Portal turystyczny Ciociaria",
    programmaTitle: "Program", programmaDesc: "Najpiękniejszy dzień",
    progCerimonia: "Ceremonia", progCerimoniaDesc: "Wymiana przysiąg",
    progAperitivo: "Aperitif", progAperitivoDesc: "Tosty i przekąski",
    progPranzo: "Obiad weselny", progPranzoDesc: "Uroczysta kolacja",
    progTorta: "Krojenie tortu", progTortaDesc: "Słodki moment razem",
    expectTitle: "Czego się spodziewać", expectSubtitle: "Włosko-polskie wesele",
    serenataTitle: "Tradycyjna Serenada",
    serenataText: "Kilka dni przed ślubem, oficjalnie rozpoczniemy uroczystości ślubne tradycyjną serenadą. Tańce, hulanki i swawole, nie może Cię zabraknąć! O szczegóły pytaj Pana Młodego… pamiętaj, to tajemnica! 😉",
    pranzoTitle: "Włoski obiad", pranzoText: "Przygotuj się na włoską ucztę – długie, biesiadne i pełne smaków doświadczenie przy stole!",
    vodkaTitle: "Wódka Weselna", vodkaText: "Na zdrowie!' - weź udział w tradycyjnym polskim toaście.",
    rsvpTitle: "Potwierdzenie", rsvpDesc: "Potwierdź swoją obecność",
    nomeLabel: "Imię i nazwisko", nomePlaceholder: "Wpisz swoje imię",
    emailLabel: "Email", emailPlaceholder: "email@example.com",
    partecipiLabel: "Czy weźmiesz udział?", si: "Tak, będę!", no: "Niestety nie mogę",
    ospitiLabel: "Liczba gości", allergieLabel: "Alergie lub specjalne diety",
    messaggioLabel: "Wiadomość dla nowożeńców", messaggioPlaceholder: "Napisz coś od siebie...", invia: "Wyślij potwierdzenie",
    fotoTitle: "Udostępnij zdjęcia", fotoDesc: "Uwiecznij magiczne chwile",
    fotoText: "Zeskanuj kod QR, aby przesłać zdjęcia bezpośrednio do naszej wspólnej chmury. Liczy się każdy moment!",
    scansiona: "Zeskanuj, aby przesłać",
    datiTitle: "Ważne dla nas",
    datiText: "Mamy wielką nadzieję, że będziesz towarzyszyć nam w tak ważnych dla nas chwilach.",
    datiIntestato: "Jeśli chcesz dołożyć się do naszej podróży poślubnej, naszych marzeń lub po prostu postawić nam piwo na plaży:",
    grazie: "Dziękujemy z całego serca ♡"
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
    safeSetText('a[href="#home"]', t.navHome);
    safeSetText('a[href="#cerimonia"]', t.navCerimonia);
    safeSetText('a[href="#location"]', t.navLocation);
    safeSetText('a[href="#alloggio "]', t.navAlloggio); 
    safeSetText('a[href="#alatri"]', t.navAlatri);
    safeSetText('a[href="#rsvp"]', t.navRsvp);
    safeSetText('a[href="#foto"]', t.navFoto);
    safeSetText('a[href="#dati"]', t.navDati);

    // Home
    safeSetText('.home-subtitle', t.homeSubtitle);
    safeSetText('.home-date span:first-child', t.homeDate);
    safeSetText('.home-date span:nth-child(2)', t.homeTime);
    safeSetText('.home-button', t.saveDate);
    safeSetText('#label-days', t.days);
    safeSetText('#label-hours', t.hours);
    safeSetText('#label-minutes', t.minutes);
    safeSetText('#label-seconds', t.seconds);

    // Cerimonia & Location
    safeSetText('#cerimonia .section-intro h2', t.cerimoniaTitle);
    safeSetText('#cerimonia .section-intro p', t.cerimoniaDesc);
    safeSetText('#cerimonia .button', t.portamiLi);
    safeSetText('#location .section-intro h2', t.locationTitle);
    safeSetText('#location .section-intro p', t.locationDesc);
    safeSetText('#location .button', t.portamiLi);

    // Alloggio
    safeSetText('#alloggio .section-intro h2', t.alloggioTitle);
    safeSetText('#alloggio .info-card p.justify', t.alloggioText);

    // Alatri
    safeSetText('#alatri .section-intro h2', t.alatriTitle);
    const alatriParagraphs = document.querySelectorAll('#alatri .info-card p');
    if (alatriParagraphs.length >= 2) {
      alatriParagraphs[0].textContent = t.alatriText1;
      alatriParagraphs[1].textContent = t.alatriText2;
    }
    safeSetText('#alatri .info-card .button', t.alatriLink);

    // Programma
    safeSetText('#programma .section-intro h2', t.programmaTitle);
    safeSetText('#programma .section-intro p', t.programmaDesc);
    safeSetText('#programma .timeline-event:nth-child(1) h3', t.progCerimonia);
    safeSetText('#programma .timeline-event:nth-child(1) p', t.progCerimoniaDesc);
    safeSetText('#programma .timeline-event:nth-child(2) h3', t.progAperitivo);
    safeSetText('#programma .timeline-event:nth-child(2) p', t.progAperitivoDesc);
    safeSetText('#programma .timeline-event:nth-child(3) h3', t.progPranzo);
    safeSetText('#programma .timeline-event:nth-child(3) p', t.progPranzoDesc);
    safeSetText('#programma .timeline-event:nth-child(4) h3', t.progTorta);
    safeSetText('#programma .timeline-event:nth-child(4) p', t.progTortaDesc);

    // Cosa Aspettarsi
    const finalGrid = document.querySelector('.final-grid');
    if (finalGrid) {
      const pSubtitle = finalGrid.previousElementSibling; 
      if (pSubtitle) {
        pSubtitle.textContent = t.expectSubtitle;
        const h2Title = pSubtitle.previousElementSibling; 
        if (h2Title) h2Title.textContent = t.expectTitle;
      }
      
      const finalCards = finalGrid.querySelectorAll('.final-card');
      if (finalCards.length >= 3) {
        finalCards[0].querySelector('h3').textContent = t.serenataTitle;
        finalCards[0].querySelector('p').textContent = t.serenataText;
        
        finalCards[1].querySelector('h3').textContent = t.pranzoTitle;
        finalCards[1].querySelector('p').textContent = t.pranzoText;
        
        finalCards[2].querySelector('h3').textContent = t.vodkaTitle;
        finalCards[2].querySelector('p').textContent = t.vodkaText;
      }
    }

    // RSVP
    safeSetText('#rsvp .section-intro h2', t.rsvpTitle);
    safeSetText('#rsvp .section-intro p', t.rsvpDesc);
    safeSetText('#rsvpForm .field-row:first-of-type label:first-of-type span', t.nomeLabel);
    safeSetPlaceholder('#rsvpForm input[name="name"]', t.nomePlaceholder);
    safeSetText('#rsvpForm .field-row:first-of-type label:nth-of-type(2) span', t.emailLabel);
    safeSetPlaceholder('#rsvpForm input[name="email"]', t.emailPlaceholder);
    safeSetText('#rsvpForm .radio-row > span', t.partecipiLabel);
    safeSetText('#rsvpForm .radio-row label:first-of-type span', t.si);
    safeSetText('#rsvpForm .radio-row label:nth-of-type(2) span', t.no);
    safeSetText('#rsvpForm > label:nth-of-type(1) span', t.ospitiLabel); 
    safeSetText('#rsvpForm > label:nth-of-type(2) span', t.allergieLabel);
    safeSetPlaceholder('#rsvpForm input[name="diet"]', t.allergiePlaceholder);
    safeSetText('#rsvpForm > label:nth-of-type(3) span', t.messaggioLabel);
    safeSetPlaceholder('#rsvpForm textarea[name="message"]', t.messaggioPlaceholder);
    safeSetText('#rsvpForm button[type="submit"]', t.invia);

    // Foto
    safeSetText('#foto .section-intro h2', t.fotoTitle);
    safeSetText('#foto .section-intro p', t.fotoDesc);
    safeSetText('#foto .foto-card > p:first-of-type', t.fotoText);
    safeSetText('#foto .caption', t.scansiona);

    // Dati
    const datiSections = document.querySelectorAll('#dati');
    if (datiSections.length > 0) {
      const firstDati = datiSections[0];
      const h2Dati1 = firstDati.querySelector('.section-intro h2');
      if (h2Dati1) h2Dati1.textContent = t.datiTitle;
      const pDati1 = firstDati.querySelector('.section-intro p');
      if (pDati1) pDati1.textContent = t.datiText;
      const intestatoP = firstDati.querySelector('.card-iban p');
      if (intestatoP) intestatoP.textContent = t.datiIntestato;
      
      if (datiSections.length > 1) {
        const secondDati = datiSections[1];
        const h2Dati2 = secondDati.querySelector('.section-intro h2');
        if (h2Dati2) h2Dati2.textContent = t.grazie;
      }
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