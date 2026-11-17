const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-mobile');

function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu': 'Open menu')
}

// Klik hamburger -> buka/tutup
toggle.addEventListener("click", () => {
    const sedangTerbuka = toggle.getAttribute("aria-expanded") === "true";
    setMenu(!sedangTerbuka);
});

// Klik salah satu link -> tutup menu
menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        setMenu(false);
    }
});

// Tombol Escape -> tutup menu, fokus kembali ke tombol
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
    }
});

// Layar melebar melewati breakpoint -> reset status
window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) {
        setMenu(false);
    }
});


// Efek mengetik bergantian di judul hero
const typer = document.querySelector(".typewriter");

if (typer) {
    const kata = typer.dataset.words.split("|");

    const JEDA_KETIK = 90;
    const JEDA_HAPUS = 45; 
    const JEDA_PENUH = 1600;
    const JEDA_KOSONG = 350;

    let indeks = 0;    
    let huruf = 0;
    let menghapus = false;

    function langkah() {
        const sekarang = kata[indeks];

        huruf += menghapus ? -1 : 1;
        typer.textContent = sekarang.slice(0, huruf);

        let jeda = menghapus ? JEDA_HAPUS : JEDA_KETIK;

        if (!menghapus && huruf === sekarang.length) {
            menghapus = true;
            jeda = JEDA_PENUH;
        } else if (menghapus && huruf === 0) {
            menghapus = false;
            indeks = (indeks + 1) % kata.length;
            jeda = JEDA_KOSONG;
        }

        setTimeout(langkah, jeda);
    }

    // mematikan animasi di OS user yang mematikan animasi
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typer.textContent = kata[0];
    } else {
        langkah();
    }
}
