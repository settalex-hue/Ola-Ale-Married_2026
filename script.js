document.addEventListener('DOMContentLoaded', () => {
    const seal = document.getElementById('sealButton');
    const intro = document.getElementById('envelopeIntro');
    const letter = document.querySelector('.letter');
    const shell = document.querySelector('.site-shell');

    // ANIMAZIONE BUSTA
    if(seal) {
        seal.addEventListener('click', () => {
            // 1. Apri il lembo
            intro.classList.add('open');
            
            // 2. Fai uscire la lettera dopo che il lembo è quasi aperto
            setTimeout(() => {
                if(letter) letter.classList.add('visible');
            }, 800);
            
            // 3. Nascondi tutto e mostra la Home dopo 5 secondi
            setTimeout(() => {
                intro.classList.add('closing');
                shell.classList.add('visible');
                window.scrollTo(0, 0); // Torna in cima alla pagina
            }, 5500);
        });
    }

    // COUNTDOWN
    const targetDate = new Date("2026-09-26T11:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('minutes');
        const secsEl = document.getElementById('seconds');

        if(daysEl) daysEl.innerText = d;
        if(hoursEl) hoursEl.innerText = h;
        if(minsEl) minsEl.innerText = m;
        if(secsEl) secsEl.innerText = s;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
