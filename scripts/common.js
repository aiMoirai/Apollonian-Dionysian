const toggle = document.getElementById("switch");
// Selezione dei separatori
const separators = ["break1", "break2", "break3"].map(id => document.getElementById(id));
// Bottone dinamico
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
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png',
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
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sopra_colonne_psychedelic.png',
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/centro_colonne_psychedelic.png',
            '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sotto_colonne_psychedelic.png'
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

// Funzione per gestire la sottolineatura dinamica nel menu
function highlightSelectedTheme(themeName) {
    // Rimuove la sottolineatura e la classe active da tutti i link
    document.querySelectorAll('.dropdown-menu a[id^="theme-"]').forEach(item => {
        item.classList.remove('theme-selected', 'active');
        // Rimuove eventuali checkmark residui
        const checkmark = item.querySelector('.theme-checkmark');
        if (checkmark) checkmark.remove();
    });

    // Applica la classe al tema corrente
    const selectedItem = document.getElementById(`theme-${themeName}`);
    if (selectedItem) {
        selectedItem.classList.add('theme-selected');
    }
}

// Funzione per applicare la light mode (solo per tema default)
function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);
    separators.forEach((img, i) => {
        if (img) img.src = isOn ? lightModeImgs[i] : themeConfigs.default.imgs[i];
    });
    localStorage.setItem("lightMode", isOn);
}

// Funzione principale per cambiare tema
function changeTheme(themeName) {
    const config = themeConfigs[themeName];
    if (!config) return console.error("Tema non trovato:", themeName);

    // 1. Cambio file CSS (carica la nuova variabile --yellow)
    const themeLink = document.getElementById('theme-link');
    if (themeLink) themeLink.href = config.css;

    // 2. Cambio immagini separatori
    separators.forEach((img, i) => {
        if (img) img.src = config.imgs[i];
    });

    // 3. Cambio immagine bottone
    if (themeWineButton) {
        themeWineButton.src = config.button || "/Apollonian-Dionysian/imgs/wine_button.png";
    }

    // 4. Gestione Toggle Light Mode
    const isDefault = themeName === 'default';
    if (toggle) {
        const toggleContainer = toggle.parentElement;
        if (isDefault) {
            toggleContainer.style.display = "block";
            const wasLight = localStorage.getItem("lightMode") === "true";
            applyLightMode(wasLight);
            toggle.checked = wasLight;
        } else {
            toggleContainer.style.display = "none";
            document.body.classList.remove("lightmode");
        }
    }

    // 5. Evidenziazione nel menu (sotto-lineatura colorata)
    highlightSelectedTheme(themeName);

    // Salvataggio sessione
    sessionStorage.setItem('selectedTheme', themeName);
}

// Inizializzazione al caricamento
window.addEventListener("DOMContentLoaded", () => {
    const sessionTheme = sessionStorage.getItem('selectedTheme') || 'default';
    changeTheme(sessionTheme);

    // Listener per il toggle light mode
    if (toggle) {
        toggle.addEventListener("change", () => {
            applyLightMode(toggle.checked);
        });
    }

    // Gestione click menu temi (Delegation)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[id^="theme-"]');
        if (link) {
            e.preventDefault();
            const themeID = link.id.replace('theme-', '');
            changeTheme(themeID);
        }
    });

    // Logica Scroll (opzionale, mantenuta dal tuo codice originale)
    const scrollToHash = () => {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + 12);
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };
    scrollToHash();
});