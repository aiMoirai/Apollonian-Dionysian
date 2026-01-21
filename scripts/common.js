const toggle = document.getElementById("switch");
const separators = ["break1", "break2", "break3"].map(id => document.getElementById(id));
const themeWineButton = document.getElementById("wineButton");

const themeConfigs = {
    'default': {
        css: '/Apollonian-Dionysian/main.css',
        imgs: ['/Apollonian-Dionysian/imgs/sopra colonna.png', '/Apollonian-Dionysian/imgs/centro colonna.png', '/Apollonian-Dionysian/imgs/fine colonne.png']
    },
    '1800': {
        css: '/Apollonian-Dionysian/Themes/1800.css',
        imgs: ['/Apollonian-Dionysian/imgs/col_sopra_noir.png', '/Apollonian-Dionysian/imgs/col_centro_noir.png', '/Apollonian-Dionysian/imgs/col_sotto_noir.png'],
        button: '/Apollonian-Dionysian/imgs/assenzio_button.png'
    },
    'rococo': {
        css: '/Apollonian-Dionysian/Themes/rococo.css',
        imgs: ['/Apollonian-Dionysian/imgs/rococo_nuvole.png', '/Apollonian-Dionysian/imgs/rococo_nuvole.png', '/Apollonian-Dionysian/imgs/rococo_nuvole.png'],
        button: '/Apollonian-Dionysian/imgs/rococo_glass2.png'
    },
    'artdeco': {
        css: '/Apollonian-Dionysian/Themes/art deco/art_deco.css',
        imgs: ['/Apollonian-Dionysian/imgs/art deco/columns/sopra_colonne_artdeco.jpeg', '/Apollonian-Dionysian/imgs/art deco/columns/centro_colonne_artdeco.jpeg', '/Apollonian-Dionysian/imgs/art deco/columns/sotto_colonne_artdeco.jpeg'],
        button: '/Apollonian-Dionysian/imgs/art deco/champagne_button.png'
    },
    'psychedelic': {
        css: '/Apollonian-Dionysian/Themes/psychedelic 70s/psychedelic.css',
        imgs: ['/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sopra_colonne_psychedelic.png', '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/centro_colonne_psychedelic.png', '/Apollonian-Dionysian/imgs/psychedelic 70s/columns/sotto_colonne_psychedelic.png'],
        button: '/Apollonian-Dionysian/imgs/psychedelic 70s/psychedelic_wine_button.png'
    },
    '90s': {
        css: '/Apollonian-Dionysian/Themes/90s.css',
        imgs: ['/Apollonian-Dionysian/imgs/sopra_col_90.png', '/Apollonian-Dionysian/imgs/centro_col_90.png', '/Apollonian-Dionysian/imgs/sotto_col_90.png'],
        button: '/Apollonian-Dionysian/imgs/start_button.png'
    },
    '2035': {
        css: '/Apollonian-Dionysian/Themes/2035.css',
        imgs: ['/Apollonian-Dionysian/imgs/2035_col (1).png', '/Apollonian-Dionysian/imgs/2035_col (2).png', '/Apollonian-Dionysian/imgs/2035_col (3).png'],
        button: '/Apollonian-Dionysian/imgs/2035_glass.png'
    }
};

const lightModeImgs = ['imgs/sopra_col_light.png', 'imgs/centro_col_light.png', 'imgs/fine_col_light.png'];

// --- 1. FUNZIONE EVIDENZIAZIONE ---
function highlightSelectedTheme(themeName) {
    document.querySelectorAll('.dropdown-menu a[id^="theme-"]').forEach(item => {
        item.classList.remove('active');
        item.style.textDecoration = '';
        const checkmark = item.querySelector('.theme-checkmark');
        if (checkmark) checkmark.remove();
    });

    const selectedItem = document.getElementById(`theme-${themeName}`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        selectedItem.style.textDecoration = 'underline';
        selectedItem.style.textDecorationColor = 'var(--yellow)';
        selectedItem.style.textDecorationThickness = '1px';
        selectedItem.style.textUnderlineOffset = '4px';

        const checkmark = document.createElement('span');
        checkmark.className = 'theme-checkmark ms-2';
        checkmark.textContent = '✓';
        checkmark.style.color = 'var(--yellow)';
        selectedItem.appendChild(checkmark);
    }
}

// --- 2. FUNZIONE APPLICA LIGHT MODE ---
function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);
    separators.forEach((img, i) => {
        if (img) img.src = isOn ? lightModeImgs[i] : themeConfigs.default.imgs[i];
    });
    localStorage.setItem("lightMode", isOn);
}

// --- 3. FUNZIONE CAMBIO TEMA ---
function changeTheme(themeName) {
    const config = themeConfigs[themeName];
    if (!config) return;

    // Cambio CSS
    const themeLink = document.getElementById('theme-link');
    if (themeLink) themeLink.href = config.css;

    // Cambio Immagini
    separators.forEach((img, i) => {
        if (img) img.src = config.imgs[i];
    });

    // Bottone Bicchiere
    if (themeWineButton) {
        themeWineButton.src = config.button || "/Apollonian-Dionysian/imgs/wine_button.png";
    }

    // Gestione Toggle Light Mode
    const isDefault = (themeName === 'default');
    if (toggle) {
        const toggleWrapper = toggle.parentElement;
        if (isDefault) {
            toggleWrapper.style.display = "block"; // Invece di rimuovere, nascondiamo per stabilità
            const wasLight = localStorage.getItem("lightMode") === "true";
            applyLightMode(wasLight);
            toggle.checked = wasLight;
        } else {
            toggleWrapper.style.display = "none";
            document.body.classList.remove("lightmode");
        }
    }

    highlightSelectedTheme(themeName);
    sessionStorage.setItem('selectedTheme', themeName);
}

// --- 4. INIZIALIZZAZIONE E EVENTI ---
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = sessionStorage.getItem('selectedTheme') || 'default';
    changeTheme(savedTheme);

    // Click sui temi
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[id^="theme-"]');
        if (link) {
            e.preventDefault();
            const themeName = link.id.replace('theme-', '');
            changeTheme(themeName);
        }
    });

    // Toggle Light Mode
    if (toggle) {
        toggle.addEventListener("change", () => {
            applyLightMode(toggle.checked);
        });
    }
});