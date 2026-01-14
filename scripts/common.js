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
            '/Apollonian-Dionysian/imgs/',
            '/Apollonian-Dionysian/imgs/',
            '/Apollonian-Dionysian/imgs/'
        ]
    },
    'rococo': {
        css: '/Apollonian-Dionysian/Themes/rococo.css',
        imgs: [
            '/Apollonian-Dionysian/imgs/rococo_sopra.png',
            '/Apollonian-Dionysian/imgs/rococo_centro.png',
            '/Apollonian-Dionysian/imgs/rococo_sotto.png'
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

function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);

    separators.forEach((img, i) => {
        if (img) img.src = isOn ? lightModeImgs[i] : themeConfigs.default.imgs[i];
    });

    localStorage.setItem("lightMode", isOn);
}

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

    localStorage.setItem('selectedTheme', themeName);
}

// Event Listeners e Inizializzazione
if (toggle) {
    toggle.addEventListener("change", () => {
        if ((localStorage.getItem('selectedTheme') || 'default') !== 'default') {
            toggle.checked = false;
            return alert("La modalità chiara è disponibile solo nel tema Default");
        }
        applyLightMode(toggle.checked);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    changeTheme(savedTheme);

    // Delega dell'evento per i link dei temi (più efficiente di molti listener singoli)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[id^="theme-"]');
        if (link) {
            e.preventDefault();
            changeTheme(link.id.replace('theme-', ''));
        }
    });
});






