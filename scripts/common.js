const toggle = document.getElementById("switch");
// Seleziona tutti i break in un colpo solo tramite gli ID
const separators = ["break1", "break2", "break3"].map(id => document.getElementById(id));

// Bottone (esiste nell'HTML come <img id="wineButton" ...>)
const themeWineButton = document.getElementById("wineButton");

const themeConfigs = {
    'default': {
        css: '/Apollonian-Dionysian/main.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/sopra colonna.png',
            '/Apollonian-Dionysian/imgs/centro colonna.png',
            '/Apollonian-Dionysian/imgs/fine colonne.png'
        ]
    },
    '1800': {
        css: '/Apollonian-Dionysian/Themes/1800.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/col_sopra_noir.png',
            '/Apollonian-Dionysian/imgs/col_centro_noir.png',
            '/Apollonian-Dionysian/imgs/col_sotto_noir.png'
        ],
        button: '/Apollonian-Dionysian/imgs/assenzio_button.png'

    },
    'rococo': {
        css: '/Apollonian-Dionysian/Themes/rococo.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png',
            '/Apollonian-Dionysian/imgs/rococo_putti.png',
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png'
        ],
        button: '/Apollonian-Dionysian/imgs/rococo_glass2.png'

    },
    'artdeco': {
        css: '/Apollonian-Dionysian/Themes/art deco/art_deco.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/art deco/columns/sopra_colonne_artdeco.jpeg',
            '/Apollonian-Dionysian/imgs/art deco/columns/centro_colonne_artdeco.jpeg',
            '/Apollonian-Dionysian/imgs/art deco/columns/sotto_colonne_artdeco.jpeg'
        ],
        button: '/Apollonian-Dionysian/imgs/art deco/champagne_button.png'
    },
    'psychedelic': {
        css: '/Apollonian-Dionysian/Themes/psychedelic 70s/psychedelic.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sopra_colonne_psychedelic.jpeg',
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/centro_colonne_psychedelic.jpeg',
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sotto_colonne_psychedelic.jpeg'
        ],
        button: '/Apollonian-Dionysian/imgs/psychedelic 70s/psychedelic_wine_button.png'
    },
    '90s': {
        css: '/Apollonian-Dionysian/Themes/90s.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/sopra_col_90.png',
            '/Apollonian-Dionysian/imgs/centro_col_90.png',
            '/Apollonian-Dionysian/imgs/sotto_col_90.png'
        ],
        button: '/Apollonian-Dionysian/imgs/start_button.png'
    },
    '2035': {
        css: '/Apollonian-Dionysian/Themes/2035.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/2035_col (1).png',
            '/Apollonian-Dionysian/imgs/2035_col (2).png',
            '/Apollonian-Dionysian/imgs/2035_col (3).png'
        ],
        button: '/Apollonian-Dionysian/imgs/2035_glass.png'
    }
};

const lightModeImgs = ['imgs/sopra_col_light.png', 'imgs/centro_col_light.png', 'imgs/fine_col_light.png'];

// Funzione per applicare la light mode
function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);

    separators.forEach((img, i) => {
        if (img) img.src = isOn ? lightModeImgs[i] : themeConfigs.default.imgs[i];
    });

    localStorage.setItem("lightMode", isOn);
}

// Funzione per cambiare tema
function changeTheme(themeName) {
    const config = themeConfigs[themeName];
    if (!config) return console.error("Tema non trovato:", themeName);

    // 1. Cambio CSS
    const themeLink = document.getElementById('theme-link');
    if (themeLink) themeLink.href = config.css;

    // 2. Cambio immagini separatori
    separators.forEach((img, i) => {
        if (img) img.src = config.imgs[i];
    });

    // 3. Cambia immagine bottone bicchiere
    if (themeWineButton) {
        themeWineButton.src = config.button || "imgs/wine_button.png";
        themeWineButton.style.display = "block";
        themeWineButton.style.marginLeft = "auto";
        themeWineButton.style.marginRight = "auto";
    }

    // 4. Gestione Light Mode
    const isDefault = themeName === 'default';

    // --- NUOVA PARTE: rimuovo completamente il toggle se tema non è default ---
    if (toggle) {
        if (isDefault) {
            // Reinserisco il toggle nella pagina se manca
            if (!document.body.contains(toggle)) {
                document.body.appendChild(toggle.parentElement); // inserisco il div che contiene l'input
            }
        } else {
            // Rimuovo completamente il toggle dal DOM
            if (document.body.contains(toggle)) {
                toggle.parentElement.remove();
            }
        }
    }

    if (!isDefault) {
        document.body.classList.remove("lightmode");
        localStorage.setItem("lightMode", false);
        if (toggle) toggle.checked = false;
    } else {
        setTimeout(() => {
            const wasLight = localStorage.getItem("lightMode") === "true";
            applyLightMode(wasLight);
            if (toggle) toggle.checked = wasLight;
        }, 100);
    }

    // Salvo il tema selezionato solo per la sessione (rimane attivo tra pagine)
    sessionStorage.setItem('selectedTheme', themeName);
    // Aggiorna classe active nel dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.toggle('active', item.id === `theme-${themeName}`);
    });

}

// Gestione toggle light mode
if (toggle) {
    toggle.addEventListener("change", () => {
        const currentTheme = sessionStorage.getItem('selectedTheme') || 'default';
        if (currentTheme !== 'default') {
            toggle.checked = false;
            return alert("La modalità chiara è disponibile solo nel tema Default");
        }
        applyLightMode(toggle.checked);
    });
}

// Inizializzazione al caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
    // Controllo se esiste un tema salvato nella sessione (navigazione tra pagine)
    const sessionTheme = sessionStorage.getItem('selectedTheme');
    if (sessionTheme) {
        // Navigazione tra pagine: riapplico il tema della sessione
        changeTheme(sessionTheme);
    } else {
        // Primo caricamento del sito: forza default theme
        changeTheme('default');
    }

    // Delega degli eventi per i link dei temi
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[id^="theme-"]');
        if (link) {
            e.preventDefault();
            changeTheme(link.id.replace('theme-', ''));
        }
    });

    const BASE_GAP = 12;
    const BOOKING_EXTRA_GAP = 112;

    const getNavHeight = () => {
        const nav = document.querySelector('.navbar');
        if (nav) return nav.offsetHeight;
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-offset');
        const parsed = parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : 0;
    };

    const getOffsetForTarget = (target) => {
        const extra = target && target.id === 'booking' ? BOOKING_EXTRA_GAP : BASE_GAP;
        return getNavHeight() + extra;
    };

    const scrollToHash = (behavior = 'auto') => {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (!target) return;
        const offset = getOffsetForTarget(target);
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior });
    };

    // Smooth scroll con offset dinamico della navbar per le anchor interne
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();

            const offset = getOffsetForTarget(target);
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // Allinea la posizione dopo che immagini/layout sono caricati
    scrollToHash('auto');
    window.addEventListener('load', () => {
        scrollToHash('auto');
    });

    window.addEventListener('home:scroller-ready', () => {
        scrollToHash('auto');
    });
});
