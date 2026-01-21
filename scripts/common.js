const toggle = document.getElementById("switch");

// Selezione dei separatori
const separators = ["break1", "break2", "break3"].map(id => document.getElementById(id));

// Bottone dinamico
const themeWineButton = document.getElementById("wineButton");

/* =========================
   CONFIGURAZIONE TEMI
========================= */

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

const lightModeImgs = [
    'imgs/sopra_col_light.png',
    'imgs/centro_col_light.png',
    'imgs/fine_col_light.png'
];

/* =========================
   SOTTOLINEATURA UNIFICATA
   (ABOUT + THEME)
========================= */

function highlightDropdownItem(group, value) {
    document
        .querySelectorAll(`.dropdown-item[data-group="${group}"]`)
        .forEach(item => item.classList.remove('is-selected'));

    let selectedItem = null;

    if (group === 'theme') {
        selectedItem = document.getElementById(`theme-${value}`);
    }

    if (group === 'about') {
        selectedItem = document.querySelector(
            `.dropdown-item[data-group="about"][href="${value}"]`
        );
    }

    if (selectedItem) {
        selectedItem.classList.add('is-selected');
        sessionStorage.setItem(`selected-${group}`, value);
    }
}

/* =========================
   LIGHT MODE (DEFAULT)
========================= */

function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);
    separators.forEach((img, i) => {
        if (img) img.src = isOn ? lightModeImgs[i] : themeConfigs.default.imgs[i];
    });
    localStorage.setItem("lightMode", isOn);
}

/* =========================
   CAMBIO TEMA (INTOCCATO)
========================= */

function changeTheme(themeName) {
    const config = themeConfigs[themeName];
    if (!config) return;

    const themeLink = document.getElementById('theme-link');
    if (themeLink) themeLink.href = config.css;

    separators.forEach((img, i) => {
        if (img) img.src = config.imgs[i];
    });

    if (themeWineButton) {
        themeWineButton.src = config.button || "/Apollonian-Dionysian/imgs/wine_button.png";
    }

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

    highlightDropdownItem('theme', themeName);
    sessionStorage.setItem('selected-theme', themeName);
}

/* =========================
   INIT
========================= */

window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = sessionStorage.getItem('selected-theme') || 'default';
    changeTheme(savedTheme);

    const savedAbout = sessionStorage.getItem('selected-about');
    if (savedAbout) {
        highlightDropdownItem('about', savedAbout);
    }

    if (toggle) {
        toggle.addEventListener("change", () => {
            applyLightMode(toggle.checked);
        });
    }

    // Click sui temi
    document.addEventListener('click', (e) => {
        const themeLink = e.target.closest('[id^="theme-"]');
        if (themeLink) {
            e.preventDefault();
            const themeID = themeLink.id.replace('theme-', '');
            changeTheme(themeID);
        }

        const aboutLink = e.target.closest('.dropdown-item[data-group="about"]');
        if (aboutLink) {
            highlightDropdownItem('about', aboutLink.getAttribute('href'));
        }
    });
});
