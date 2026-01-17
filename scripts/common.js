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
        ]
    },
    'rococo': {
        css: '/Apollonian-Dionysian/Themes/rococo.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png',
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png',
            '/Apollonian-Dionysian/imgs/rococo_nuvole.png'
        ]
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
            '/Apollonian-Dionysian/imgs/sopra_col_futuristic.png',
            '/Apollonian-Dionysian/imgs/centro_col_futuristic.png',
            '/Apollonian-Dionysian/imgs/fine_col_futuristic.png'
        ]
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
});
