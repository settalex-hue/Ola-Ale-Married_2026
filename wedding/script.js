// ==========================================
// SICUREZZA INIZIALE EMAILJSd
// ==========================================
try {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("uml8QCRY1Ba5qjr80");
  }
} catch (e) {
  console.warn("Libreria EmailJS bloccata (es. Adblocker). Le mail potrebbero non funzionare.");
}

// ==========================================
// VARIABILI GLOBALI E COUNTDOWN
// ==========================================
const rsvpForm = document.getElementById("rsvpForm");
const toast = document.getElementById("toast");
const targetDate = new Date("2026-09-26T11:00:00").getTime();

function updateCountdown() {
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  if (!dEl || !hEl || !mEl || !sEl) return;

  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    dEl.innerText = "00"; hEl.innerText = "00"; mEl.innerText = "00"; sEl.innerText = "00";
    return;
  }

  dEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  hEl.innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
  mEl.innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  sEl.innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// FUNZIONE CALENDARIO (SAVE THE DATE)
// ==========================================
function aggiungiAlCalendario() {
  const icsMSG = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n" +
    "DTSTART:20260926T113000\nDTEND:20260926T235900\n" +
    "SUMMARY:Matrimonio Aleksandra & Alessandro\n" +
    "LOCATION:Tenuta Il Sogno - Piglio, FR\n" +
    "DESCRIPTION:Non mancare al nostro giorno speciale!\n" +
    "END:VEVENT\nEND:VCALENDAR";

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

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

// ==========================================
// SCROLL MORBIDO NAVIGAZIONE
// ==========================================
document.querySelectorAll(".main-nav a").forEach((link) => {
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
    homeSubtitle: "Il matrimonio di", homeDate: "26 Settembre 2026", homeTime: "Ore 11:00", saveDate: "Save the Date",
    days: "giorni", hours: "ore", minutes: "minuti", seconds: "secondi",
    cerimoniaTitle: "Cerimonia", cerimoniaDesc: "Dove celebreremo il nostro amore",
    locCerimoniaNome: "Cattedrale di S.Paolo - Civita",
    locationTitle: "Location", locationDesc: "Dove festeggeremo",
    locRicevimentoNome: "Tenuta Il Sogno - Piglio, FR",
    portamiLi: "Portami lì",
    alloggioTitle: "Alloggio",
    alloggioText: "Per chi arriverà da fuori, abbiamo pensato ad alcune strutture convenzionate in zona, così da rendere il soggiorno più semplice da pianificare. Quando contatterai la struttura, ricordati di indicare che parteciperai al nostro matrimonio: la convenzione sarà applicata, mentre la disponibilità delle camere resterà soggetta alle prenotazioni già ricevute. Ti consigliamo quindi di organizzarti con qualche giorno di anticipo, così da scegliere con calma la soluzione più comoda.",
    alatriTitle: "Alatri",
    alatriText1: "Alatri è la città che ci ha visto crescere e il luogo in cui le nostre strade si sono incrociate per caso, per poi intrecciarsi per sempre. Sorge nel cuore della Ciociaria — una regione storica del Lazio meridionale — fatta di tradizioni, folklore, borghi e sapori che parlano di casa. Se avrai modo di trattenerti qualche giorno, ti consigliamo di scoprirla con calma e di concederti una sosta per una pinta di birra al Guinness, dove tutto ebbe inizio.",
    alatriText2: "Per idee ed itinerari, puoi curiosare qui:",
    alatriLink: "Portale turismo Ciociaria",
    programmaTitle: "Programma", programmaDesc: "La giornata più bella",
    progCerimonia: "Cerimonia", progCerimoniaDesc: "Scambio delle promesse",
    progAperitivo: "Aperitivo", progAperitivoDesc: "Brindisi e stuzzichini",
    progPranzo: "Pranzo di nozze", progPranzoDesc: "Banchetto nuziale",
    progTorta: "Taglio della torta", progTortaDesc: "Dolce momento insieme",
    expectTitle: "Cosa Aspettarsi", expectSubtitle: "Un matrimonio italo-polacco",
    serenataTitle: "Serenata Folkloristica",
    serenataText: "Qualche sera prima del matrimonio daremo il via ai festeggiamenti con una serenata folkloristica in abiti tipici della tradizione, tra canti, musica e momenti in compagnia. Non puoi mancare! Per i dettagli rivolgiti allo sposo… mi raccomando, è un segreto! 😉",
    pranzoTitle: "Il pranzo italiano", pranzoText: "Preparati a un banchetto all’italiana: un momento conviviale, ricco di sapori e profumi da condividere insieme!",
    vodkaTitle: "Vodka", vodkaText: "'Na zdrowie!' - alla salute! Tieniti pronto per il brindisi polacco a base di vodka e a cantare 'Gorzka wódka!' ogni volta che vorrai invitare gli sposi a darsi un bacio.",
    rsvpTitle: "Répondez S’il Vous Plaît", rsvpDesc: "Conferma la tua presenza",
    nomeLabel: "Nome e Cognome", nomePlaceholder: "Inserisci il tuo nome",
    emailLabel: "Email", emailPlaceholder: "email@example.com (facoltativa)",
    partecipiLabel: "Parteciperai?", si: "Sì, ci sarò!", no: "Purtroppo non potrò",
    ospitiLabel: "Numero di ospiti", allergieLabel: "Allergie o diete speciali", allergiePlaceholder: "Es: vegetariano, celiaco, allergie...",
    messaggioLabel: "Un messaggio per gli sposi", messaggioPlaceholder: "Scrivi un pensiero...", invia: "Invia conferma", rsvpDeadline: "Si prega di confermare la presenza entro il 01/09/2026.",
    fotoTitle: "Condividi le Foto", fotoDesc: "Cattura i momenti magici",
    fotoText: "Scansiona il QR code per caricare le foto direttamente nel nostro cloud condiviso. Ogni momento conta!",
    scansiona: "Scansiona per caricare",
    datiTitle: "Un pensiero per il nostro domani",
    datiText: "Se ti va di contribuire al nostro viaggio, ai nostri sogni o semplicemente ad una birra sulla spiaggia, qui troverai le coordinate.",
    datiIntestato: "Intestato a: Alessandro Settanni",
    grazie: "Grazie di cuore ♡"
  },
  pl: {
    navHome: "Dom", navCerimonia: "Ceremonia", navLocation: "Wesele", navAlloggio: "Nocleg",
    navAlatri: "Alatri", navProgramma: "Program", navRsvp: "Potwierdzenie", navFoto: "Zdjęcia", navDati: "Dane",
    homeSubtitle: "Ślub", homeDate: "26 Września 2026", homeTime: "Godzina 11:00", saveDate: "Zapisz datę",
    days: "dni", hours: "godziny", minutes: "minuty", seconds: "sekundy",
    cerimoniaTitle: "Ceremonia", cerimoniaDesc: "Cerimonia ślubna odbędzie się w",
    locCerimoniaNome: "Katedrze św. Pawła - Civita",
    locationTitle: "Wesele", locationDesc: "Przyjęcie weselne odbędzie się w",
    locRicevimentoNome: "Villa Il Sogno - Piglio, FR",
    portamiLi: "Zabierz mnie tam",
    alloggioTitle: "Nocleg",
    alloggioText: "Dla osób przybywających z daleka przygotowaliśmy kilka polecanych obiektów w okolicy, aby ułatwić planowanie pobytu. Kontaktując się z wybranym miejscem, pamiętaj, aby wspomnieć, że jesteś gościem na naszym ślubie: zostanie naliczona zniżka, jednak dostępność pokoi zależy od wcześniejszych rezerwacji. Zalecamy więc wcześniejsze zarezerwowanie noclegu, aby spokojnie wybrać najwygodniejsze rozwiązanie.",
    alatriTitle: "Alatri",
    alatriText1: "Alatri to miasto, w którym dorastaliśmy. To miejsce, gdzie nasze ścieżki skrzyżowały się przypadkiem, by połączyć się na zawsze. Leży w sercu Ciociarii —historycznego regionu południowego Lacjum— pełnego tradycji, folkloru, urokliwych miasteczek i smaków, które kojarzą się z domem. Jeśli będziesz mieć okazję zostać tu nieco dłużej, polecamy odkryć je na spokojnie i zatrzymać się na kufel piwa w pubie Guinness, gdzie wszystko się zaczęło.",
    alatriText2: "Pomysły i plany podróży znajdziesz tutaj:",
    alatriLink: "Portal turystyczny Ciociaria",
    programmaTitle: "Program", programmaDesc: "Najpiękniejszy dzień",
    progCerimonia: "Ceremonia", progCerimoniaDesc: "Wymiana przysiąg",
    progAperitivo: "Aperitif", progAperitivoDesc: "Tosty i przekąski",
    progPranzo: "Obiad weselny", progPranzoDesc: "Uroczysta kolacja",
    progTorta: "Krojenie tortu", progTortaDesc: "Słodki moment razem",
    expectTitle: "Czego się spodziewać", expectSubtitle: "Włosko-polskie wesele",
    serenataTitle: "Tradycyjna Serenada",
    serenataText: "Kilka dni przed ślubem oficjalnie rozpoczniemy uroczystości tradycyjną serenadą w strojach ludowych. Tańce, hulanki i swawole — nie może Cię zabraknąć! O szczegóły pytaj Pana Młodego… i pamiętaj: to tajemnica! 😉",
    pranzoTitle: "Włoski obiad", pranzoText: "Przygotuj się na wspólne biesiadowanie pełne włoskich aromatów, smaków i dobrej atmosfery!",
    vodkaTitle: "Wódka", vodkaText: " 'Alla salute!' Na zdrowie! Szykuj się na polski toast i na śpiewanie “Gorzka wódka!” za każdym razem, gdy będziesz chcieć zachęcić Parę Młodą do pocałunku.",
    rsvpTitle: "Potwierdzenie", rsvpDesc: "Potwierdź swoją obecność",
    nomeLabel: "Imię i nazwisko", nomePlaceholder: "Wpisz swoje imię",
    emailLabel: "Email", emailPlaceholder: "email@example.com (opcjonalnie)",
    partecipiLabel: "Czy weźmiesz udział?", si: "Tak, będę!", no: "Niestety nie mogę",
    ospitiLabel: "Liczba gości", allergieLabel: "Alergie lub specjalne diety", allergiePlaceholder: "Np: wegetarianin, celiak, alergie...",
    messaggioLabel: "Wiadomość dla nowożeńców", messaggioPlaceholder: "Napisz coś od siebie...", invia: "Wyślij potwierdzenie", rsvpDeadline: "Prosimy o potwierdzenie obecności do 01/09/2026.",
    fotoTitle: "Udostępnij zdjęcia", fotoDesc: "Uwiecznij magiczne chwile",
    fotoText: "Zeskanuj kod QR, aby przesłać zdjęcia bezpośrednio do naszej wspólnej chmury. Liczy się każdy moment!",
    scansiona: "Zeskanuj, aby przesłać",
    datiTitle: "Będzie nam miło",
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

    // NUOVA LOGICA: Gestione dinamica dei nomi degli sposi
    document.querySelectorAll('.home-title div, .site-footer h2').forEach(div => {
      const traduzione = div.getAttribute(`data-${lang}`);
      if (traduzione) div.textContent = traduzione;
    });

    // Cerimonia & Location
    safeSetText('#cerimonia .section-intro h2', t.cerimoniaTitle);
    safeSetText('#cerimonia .section-intro p', t.cerimoniaDesc);
    safeSetText('#cerimonia .location-details h3', t.locCerimoniaNome);
    safeSetText('#cerimonia .button', t.portamiLi);

    safeSetText('#location .section-intro h2', t.locationTitle);
    safeSetText('#location .section-intro p', t.locationDesc);
    safeSetText('#location .location-details h3', t.locRicevimentoNome);
    safeSetText('#location .button', t.portamiLi);

    // Alloggio
    safeSetText('#alloggio .section-intro h2', t.alloggioTitle);
    safeSetText('#alloggio .info-card p.justify', t.alloggioText);

    // Alatri
    safeSetText('#alatri .section-intro h2', t.alatriTitle);
    const alatriParagraphs = document.querySelectorAll('#alatri .info-card p');
    if (alatriParagraphs.length >= 2) {
      if (alatriParagraphs[0]) alatriParagraphs[0].textContent = t.alatriText1;
      if (alatriParagraphs[1]) alatriParagraphs[1].textContent = t.alatriText2;
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
    document.querySelectorAll('h2').forEach(h2 => {
      if (h2.textContent.includes("Cosa Aspettarsi") || h2.textContent.includes("Czego się spodziewać")) {
        h2.textContent = t.expectTitle;
        const pNext = h2.nextElementSibling;
        if (pNext && pNext.tagName === 'P') {
          pNext.textContent = t.expectSubtitle;
        }
      }
    });

    const finalCards = document.querySelectorAll('.final-grid .final-card');
    if (finalCards.length >= 3) {
      const h3_0 = finalCards[0].querySelector('h3');
      const p_0 = finalCards[0].querySelector('p');
      if (h3_0) h3_0.textContent = t.serenataTitle;
      if (p_0) p_0.textContent = t.serenataText;

      const h3_1 = finalCards[1].querySelector('h3');
      const p_1 = finalCards[1].querySelector('p');
      if (h3_1) h3_1.textContent = t.pranzoTitle;
      if (p_1) p_1.textContent = t.pranzoText;

      const h3_2 = finalCards[2].querySelector('h3');
      const p_2 = finalCards[2].querySelector('p');
      if (h3_2) h3_2.textContent = t.vodkaTitle;
      if (p_2) p_2.textContent = t.vodkaText;
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

    const rsvpLabels = document.querySelectorAll('#rsvpForm > label > span');
    if (rsvpLabels.length >= 3) {
      rsvpLabels[0].textContent = t.ospitiLabel;
      rsvpLabels[1].textContent = t.allergieLabel;
      rsvpLabels[2].textContent = t.messaggioLabel;
    }

    safeSetPlaceholder('#rsvpForm input[name="diet"]', t.allergiePlaceholder);
    safeSetPlaceholder('#rsvpForm textarea[name="message"]', t.messaggioPlaceholder);
    safeSetText('#rsvpForm button[type="submit"]', t.invia);
    safeSetText('#rsvpForm .form-note', t.rsvpDeadline);

    // Foto
    safeSetText('#foto .section-intro h2', t.fotoTitle);
    safeSetText('#foto .section-intro p', t.fotoDesc);
    safeSetText('#foto .foto-card > p:first-of-type', t.fotoText);
    safeSetText('#foto .caption', t.scansiona);

    // Dati
    const firstDati = document.querySelector('#dati');
    if (firstDati) {
      const h2Dati1 = firstDati.querySelector('.section-intro h2');
      if (h2Dati1) h2Dati1.textContent = t.datiTitle;
      const pDati1 = firstDati.querySelector('.section-intro p');
      if (pDati1) pDati1.textContent = t.datiText;
      const intestatoP = firstDati.querySelector('.card-iban p');
      if (intestatoP) intestatoP.textContent = t.datiIntestato;
    }

    // NUOVA LOGICA: Gestione icone IBAN e testo IBAN
    const ibanCont = document.getElementById('iban-container');
    const polishIcons = document.getElementById('polish-icons');

    if (lang === 'pl') {
      if (ibanCont) ibanCont.style.display = 'none'; // Nasconde l'IBAN
      if (polishIcons) polishIcons.style.display = 'flex'; // Mostra le icone
    } else {
      if (ibanCont) ibanCont.style.display = 'block'; // Mostra l'IBAN
      if (polishIcons) polishIcons.style.display = 'none'; // Nasconde le icone
    }

    document.querySelectorAll('.section-intro h2').forEach(h2 => {
      if (h2.textContent.includes("Grazie di cuore") || h2.textContent.includes("Dziękujemy")) {
        h2.textContent = t.grazie;
      }
    });

  } catch (error) {
    console.error("Errore durante la traduzione:", error);
  }

  document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
  const firstBtn = document.querySelector('.lang-switcher button:first-child');
  const lastBtn = document.querySelector('.lang-switcher button:last-child');

  if (lang === 'it' && firstBtn) firstBtn.classList.add('active');
  if (lang === 'pl' && lastBtn) lastBtn.classList.add('active');
}

const btnIt = document.querySelector('.lang-switcher button:first-child');
const btnPl = document.querySelector('.lang-switcher button:last-child');
if (btnIt) btnIt.addEventListener('click', () => setLanguage('it'));
if (btnPl) btnPl.addEventListener('click', () => setLanguage('pl'));

setLanguage('it');