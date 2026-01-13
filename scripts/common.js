const toggle = document.getElementById("switch");
const separators = [
    document.getElementById("break1"),
    document.getElementById("break2"),
    document.getElementById("break3")
];

function applyLightMode(isOn) {
    document.body.classList.toggle("lightmode", isOn);

    separators.forEach((img, index) => {
        if (!img) return; // ignora immagini non presenti
        switch (index) {
            case 0: img.src = isOn ? "imgs/sopra_col_light.png" : "imgs/sopra colonna.png"; break;
            case 1: img.src = isOn ? "imgs/centro_col_light.png" : "imgs/centro colonna.png"; break;
            case 2: img.src = isOn ? "imgs/fine_col_light.png" : "imgs/fine colonne.png"; break;
        }
    });

    localStorage.setItem("lightMode", isOn);
}

if (toggle) {
    toggle.addEventListener("change", () => {
        applyLightMode(toggle.checked);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const savedState = localStorage.getItem("lightMode") === "true";
    if (toggle) toggle.checked = savedState;
    applyLightMode(savedState);
});



// ========== SWITCH TEMI DAL MENU ==========

// Configurazione temi con percorsi immagini
const themeConfig = {
    'theme-default': {
        css: 'main.css',
        images: {
            break1: 'imgs/sopra colonna.png',
            break2: 'imgs/centro colonna.png',
            break3: 'imgs/fine colonne.png'
        }
    },
    'theme-rococo': {
        css: 'Themes/rococo.css',
        images: {
            break1: 'imgs/rococo_sopra_colonna.png',
            break2: 'imgs/rococo_centro_colonna.png',
            break3: 'imgs/rococo_fine_colonne.png'
        }
    },
    'theme-90s': {
        css: 'Themes/90s.css',
        images: {
            break1: 'imgs/90s_img1.png',
            break2: 'imgs/90s-centro-colonna.png',
            break3: 'imgs/90s-fine-colonne.png'
        }
    },
    'theme-2035': {
        css: 'Themes/2035.css',
        images: {
            break1: 'imgs/futuristic_sopra_colonna.png',
            break2: 'imgs/futuristic_centro_colonna.png',
            break3: 'imgs/futuristic_fine_colonne.png'
        }
    }
};

// Elementi DOM
const themeLink = document.getElementById('theme-link');
const separators = [
    document.getElementById('break1'),
    document.getElementById('break2'),
    document.getElementById('break3')
];

// Funzione per cambiare tema
function changeTheme(themeId) {
    const config = themeConfig[themeId];
    
    if (!config) {
        console.error(`Tema ${themeId} non trovato nella configurazione`);
        return;
    }
    
    // 1. Cambia il file CSS del tema
    themeLink.href = config.css;
    
    // 2. Cambia le immagini dei separatori
    if (separators[0] && config.images.break1) {
        separators[0].src = config.images.break1;
    }
    if (separators[1] && config.images.break2) {
        separators[1].src = config.images.break2;
    }
    if (separators[2] && config.images.break3) {
        separators[2].src = config.images.break3;
    }
    
    // 3. Salva la scelta nel localStorage
    localStorage.setItem('selectedTheme', themeId);
    
    console.log(`Tema cambiato a: ${themeId}`);
}

// Aggiungi event listener a tutti i link dei temi nel menu
document.querySelectorAll('.dropdown-menu a.dropdown-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Impedisce il comportamento default del link
        
        const themeId = this.id; // Ottieni l'ID del tema cliccato
        
        if (themeConfig[themeId]) {
            changeTheme(themeId);
        }
    });
});

// All'avvio della pagina, applica il tema salvato (se presente)
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    
    // Verifica che il tema salvato esista nella configurazione
    if (savedTheme && themeConfig[savedTheme]) {
        changeTheme(savedTheme);
    }
    // Altrimenti resta il tema default (main.css)
});






