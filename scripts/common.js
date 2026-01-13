const toggle = document.getElementById("switch");
// Seleziona tutti i break in un colpo solo tramite gli ID
const separators = ["break1", "break2", "break3"].map(id => document.getElementById(id));

const themeConfigs = {
    'default': { css: 'main.css', imgs: ['imgs/sopra colonna.png', 'imgs/centro colonna.png', 'imgs/fine colonne.png'] },
    'rococo': { css: 'Themes/rococo.css', imgs: ['imgs/rococo_sopra.png', 'imgs/rococo_centro.png', 'imgs/rococo_sotto.png'] },
    '90s': { css: 'Themes/90s.css', imgs: ['imgs/sopra_col_90.png', 'imgs/centro_col_90.png', 'imgs/sotto_col_90.png'] },
    '2035': { css: 'Themes/2035.css', imgs: ['imgs/sopra_col_futuristic.png', 'imgs/centro_col_futuristic.png', 'imgs/fine_col_futuristic.png'] }
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

    // 3. Gestione Light Mode
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






