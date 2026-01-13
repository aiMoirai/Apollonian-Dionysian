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








// Configurazione dei temi
const themeConfigs = {
    'default': {
        css: 'main.css',  
        break1: 'imgs/sopra colonna.png',
        break2: 'imgs/centro colonna.png',
        break3: 'imgs/fine colonne.png'
    },
    'rococo': {
        css: 'Themes/rococo.css',  
        break1: 'imgs/sopra_col_rococo.png',  
        break2: 'imgs/centro_col_rococo.png',
        break3: 'imgs/fine_col_rococo.png'
    },
    '90s': {
        css: 'Themes/90s.css',
        break1: 'imgs/sopra_col_90s.png',
        break2: 'imgs/centro_col_90s.png',
        break3: 'imgs/fine_col_90s.png'
    },
    '2035': {
        css: 'Themes/2035.css',
        break1: 'imgs/sopra_col_futuristic.png',
        break2: 'imgs/centro_col_futuristic.png',
        break3: 'imgs/fine_col_futuristic.png'
    }
};

// Funzione per cambiare tema
function changeTheme(themeName) {
    console.log("Cambio tema a:", themeName);
    
    // 1. Recupera la configurazione del tema
    const config = themeConfigs[themeName];
    if (!config) {
        console.error("Tema non trovato:", themeName);
        return;
    }
    
    // 2. Cambia il foglio di stile CSS
    document.getElementById('theme-link').href = config.css;
    console.log("CSS cambiato a:", config.css);
    
    // 3. Cambia le immagini dei separatori (solo se esistono)
    const break1 = document.getElementById('break1');
    const break2 = document.getElementById('break2');
    const break3 = document.getElementById('break3');
    
    if (break1 && config.break1) {
        break1.src = config.break1;
        console.log("break1 cambiato:", config.break1);
    }
    if (break2 && config.break2) {
        break2.src = config.break2;
        console.log("break2 cambiato:", config.break2);
    }
    if (break3 && config.break3) {
        break3.src = config.break3;
        console.log("break3 cambiato:", config.break3);
    }
    
    // 4. Salva la scelta
    localStorage.setItem('selectedTheme', themeName);
    console.log("Tema salvato:", themeName);
}

// Quando la pagina si carica
document.addEventListener('DOMContentLoaded', function() {
    console.log("Pagina caricata - Inizializzazione temi");
    
    // Controlla se c'è un tema salvato
    const savedTheme = localStorage.getItem('selectedTheme');
    console.log("Tema salvato precedentemente:", savedTheme);
    
    // Applica il tema
    if (savedTheme && themeConfigs[savedTheme]) {
        changeTheme(savedTheme);
    } else {
        changeTheme('default');
    }
    
    // Aggiungi event listener a tutti i link che iniziano con "theme-"
    const themeLinks = document.querySelectorAll('[id^="theme-"]');
    console.log("Trovati", themeLinks.length, "link per i temi");
    
    themeLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Estrae il nome del tema dall'ID
            const themeName = this.id.replace('theme-', '');
            console.log("Cliccato su tema:", themeName);
            
            // Cambia il tema
            changeTheme(themeName);
        });
    });
    
    // Debug: mostra tutti i temi disponibili
    console.log("Temi configurati:", Object.keys(themeConfigs));
});
