


// ==================== Silvia ==================== //

const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const overlay = document.getElementById('overlay');
const rooms = document.querySelectorAll('.room');

// Room click handlers
rooms.forEach(room => {
    room.addEventListener('click', e => {
        e.stopPropagation();
        rooms.forEach(r => r.classList.remove('selected'));
        room.classList.add('selected');
        
        const contentId = 'popup-content-' + room.id;
        const contentElem = document.getElementById(contentId);
        
        if (contentElem) {
            document.getElementById('rooms-popup-content').innerHTML = contentElem.innerHTML;
            document.getElementById('rooms-popup').style.display = 'block';
            overlay.style.display = 'block';
        }
    });
});

// Image hover effects
function ingrandisciImmagine(img) {
    if (!img.getAttribute('data-original-width')) {
        img.setAttribute('data-original-width', img.getAttribute('width'));
        img.setAttribute('data-original-height', img.getAttribute('height'));
        img.setAttribute('data-original-x', img.getAttribute('x'));
        img.setAttribute('data-original-y', img.getAttribute('y'));
    }
    
    const originalWidth = parseFloat(img.getAttribute('data-original-width'));
    const originalHeight = parseFloat(img.getAttribute('data-original-height'));
    const originalX = parseFloat(img.getAttribute('data-original-x'));
    const originalY = parseFloat(img.getAttribute('data-original-y'));
    
    img.setAttribute('width', originalWidth * 1.2);
    img.setAttribute('height', originalHeight * 1.2);
    img.setAttribute('x', originalX - (originalWidth * 0.1));
    img.setAttribute('y', originalY - (originalHeight * 0.1));
    
    img.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) brightness(1.1)';
}

function riduciImmagine(img) {
    const originalWidth = img.getAttribute('data-original-width');
    const originalHeight = img.getAttribute('data-original-height');
    const originalX = img.getAttribute('data-original-x');
    const originalY = img.getAttribute('data-original-y');
    
    if (originalWidth && originalHeight && originalX && originalY) {
        img.setAttribute('width', originalWidth);
        img.setAttribute('height', originalHeight);
        img.setAttribute('x', originalX);
        img.setAttribute('y', originalY);
    }
    
    img.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
}

// Show artwork popup
function mostraPopupOpera(operaId, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    rooms.forEach(r => r.classList.remove('selected'));
    
    const contentId = 'popup-content-' + operaId;
    const contentElem = document.getElementById(contentId);
    
    if (contentElem) {
        document.getElementById('artworks-popup-content').innerHTML = contentElem.innerHTML;
        document.getElementById('artworks-popup').style.display = 'block';
        overlay.style.display = 'block';
    }
}

// Close popup
function closePopup() {
    rooms.forEach(r => r.classList.remove('selected'));
    document.getElementById('rooms-popup').style.display = 'none';
    document.getElementById('artworks-popup').style.display = 'none';
    overlay.style.display = 'none';
}

// Event listeners
overlay.addEventListener('click', closePopup);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Museum location map
window.onload = function() {
    var iframe = document.getElementById('map-iframe');
    iframe.src = iframe.src + "&" + new Date().getTime();
};

// Comments
function addComment() {
    const input = document.getElementById("commentInput");
    const text = input.value.trim();
    if (!text) return;

    let comments = JSON.parse(localStorage.getItem("museumComments") || "[]");
    comments.push(text);
    localStorage.setItem("museumComments", JSON.stringify(comments));

    input.value = "";
    renderComments();
}

function renderComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = "";

    let comments = JSON.parse(localStorage.getItem("museumComments") || "[]");
    comments.forEach(comment => {
        const div = document.createElement("div");
        div.className = "single-comment";
        div.textContent = comment;
        list.appendChild(div);
    });
}

renderComments();

// script for the light mode switch and related bg images 
const toggle = document.getElementById("switch");
const separators = [
    document.getElementById("break1"),
    document.getElementById("break2"),
    document.getElementById("break3")
];

toggle.addEventListener("change", () => {
    document.body.classList.toggle("lightmode", toggle.checked);

    separators.forEach((img, index) => {
        switch (index) {
            case 0:
                img.src = toggle.checked ? "imgs/sopra_col_light.png" : "imgs/sopra colonna.png";
                break;
            case 1:
                img.src = toggle.checked ? "imgs/centro_col_light.png" : "imgs/centro colonna.png";
                break;
            case 2:
                img.src = toggle.checked ? "imgs/fine_col_light.png" : "imgs/fine colonne.png";
                break;
        }
    });
});












// Configurazione dei temi
const themeConfigs = {
    'default': {
        css: 'main.css',  // ← Cambiato da rococo.css a main.css
        break1: 'imgs/sopra colonna.png',
        break2: 'imgs/centro colonna.png',
        break3: 'imgs/fine colonne.png'
    },
    'rococo': {
        css: 'rococo.css',  // ← Questo è il tuo tema rococo
        break1: 'imgs/sopra_col_rococo.png',  // Immagini diverse per rococo
        break2: 'imgs/centro_col_rococo.png',
        break3: 'imgs/fine_col_rococo.png'
    },
    '90s': {
        css: '90s-theme.css',
        break1: 'imgs/sopra_col_90s.png',
        break2: 'imgs/centro_col_90s.png',
        break3: 'imgs/fine_col_90s.png'
    },
    '2035': {
        css: '2035-theme.css',
        break1: 'imgs/sopra_col_futuristic.png',
        break2: 'imgs/centro_col_futuristic.png',
        break3: 'imgs/fine_col_futuristic.png'
    }
};

// Funzione per cambiare tema
function changeTheme(themeName) {
    console.log("Cambio tema a:", themeName);
    
    // Se il tema non esiste nella mappa, usa default
    const config = themeConfigs[themeName] || themeConfigs['default'];
    
    // 1. Cambia il foglio di stile CSS
    document.getElementById('theme-link').href = config.css;
    console.log("CSS cambiato a:", config.css);
    
    // 2. Cambia le immagini dei separatori (solo se esistono)
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
    
    // 3. Salva la scelta
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