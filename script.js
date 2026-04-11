document.addEventListener('DOMContentLoaded', () => {
    const seal = document.getElementById('sealButton');
    const intro = document.getElementById('envelopeIntro');
    const letter = document.querySelector('.letter');
    const shell = document.querySelector('.site-shell');

    // APERTURA BUSTA
    if(seal) {
        seal.addEventListener('click', () => {
            intro.classList.add('open');
            setTimeout(() => letter.classList.add('visible'), 500);
            
            // Dopo 4 secondi chiude tutto e mostra la Home
            setTimeout(() => {
                intro.classList.add('closing');
                shell.classList.add('visible');
                // Forza lo scroll in alto
                window.scrollTo(0, 0);
            }, 4000);
        });
    }

    // COUNTDOWN
    const target = new Date("2026-09-26T11:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;

        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }, 1000);
});
