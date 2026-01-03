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


//script for populating the index modals ------------------------

let objectsData = [];
let currentIndex = 0;

function populateModal(index) {
    const data = objectsData[index];
    if (!data) return;

    document.querySelector('#modalTemplate .modal-title-text').textContent = data.title;

    const imgLink = document.querySelector('#modalTemplate .modal-img-link');
    imgLink.href = data.image;
    const img = imgLink.querySelector('.modal-img');
    img.src = data.image;

    document.querySelector('#modalTemplate .modal-info-text').innerHTML = `
    <b>Title:</b> ${data.title}<br>
        <b>Attribution:</b> ${data.attribution}<br>
            <b>Type:</b> ${data.type}<br>
                <b>Materials and Techniques:</b> ${data.materials_techniques}<br>
                    <b>Measurements:</b> ${data.measurements}<br>
                        <b>Current Location:</b> ${data.current_location}<br>
                            <b>Creation Date:</b> ${data.creation_date}<br>
                                <b>Online Location:</b> <a href="${data.online_location.url}" target="_blank">${data.online_location.text}</a><br>
                                    `;

    document.querySelector('#modalTemplate .modal-text').innerHTML = `
                                    ${data.description}
                                    <a class="modal-more" style="margin-top:1em; text-align:right;" href="">See more</a>
                                    `;
}

// Scroller slide
function generateScroller() {
    const scroller = document.getElementById('scrollerContainer');
    objectsData.forEach((item, index) => {
        const slideLink = document.createElement('a');
        slideLink.setAttribute('role', 'button');
        slideLink.setAttribute('data-bs-toggle', 'modal');
        slideLink.setAttribute('data-bs-target', '#modalTemplate');

        slideLink.addEventListener('click', () => {
            currentIndex = index;
            populateModal(currentIndex);
        });

        slideLink.innerHTML = `
                                    <div class="container slide">
                                        <img src="${item.image}" class="scroller-img">
                                            <div class="overlay">
                                                <div class="text">${item.title}</div>
                                            </div>
                                    </div>
                                    `;
        scroller.appendChild(slideLink);
    });
}

// Navigation events
document.querySelector('.modal-prev').addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + objectsData.length) % objectsData.length;
    populateModal(currentIndex);
});

document.querySelector('.modal-next').addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % objectsData.length;
    populateModal(currentIndex);
});

// Load JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            objectsData = data;
            generateScroller();
            populateModal(currentIndex);
        })
        .catch(err => console.error('Errore caricamento JSON:', err));
});

//-----------------------------------------------

// ====================
// Some animations :)
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = [
    document.querySelector('.hero'),
    document.getElementById('intro'),
    document.getElementById('quote'),
    document.getElementById('narratives'),
    document.getElementById('museum'),
    document.querySelector('.tickets'),
    document.querySelector('.browse')
];

sections.forEach(sec => {
    if (sec) {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(50px)';
        sec.style.transition = 'all 0.8s ease-out';
    }
});


// Observer animates when they enter in the viewport
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Initial state when leaving viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
        }
    });
}, { threshold: 0.2 });


sections.forEach(sec => {
    if (sec) observer.observe(sec);
});

// ====================
// Animation wine button
// ====================
const wineButton = document.getElementById('wineButton');

if (wineButton) {
    // Initial state of the button
    wineButton.style.opacity = '0';
    wineButton.style.transform = 'translateY(-30px) scale(0.9)';
    wineButton.style.transition = 'all 0.8s ease-out';

    // When the page is loading
    window.addEventListener('load', () => {
        wineButton.style.opacity = '1';
        wineButton.style.transform = 'translateY(0) scale(1)';

        setInterval(() => {
            wineButton.style.transform = 'scale(1.15)';
            setTimeout(() => {
                wineButton.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    });
}

// ====================

// ======INIZIO Scripts for Ila's themes==============

document.getElementById('theme-90s').addEventListener('click', function (e) {
    e.preventDefault(); // evita il comportamento di link
    const themeLink = document.getElementById('theme-link');
    themeLink.setAttribute('href', 'Themes/90s.css'); // sostituisce il CSS

    // cambio dell'immagine del bottone solo in questo caso
    const btn = document.getElementById("wineButton");
    if (btn) {
        btn.src = "imgs/start_button.png";
    }

});

const theme90 = document.getElementById("theme-90s");
const themeLink = document.getElementById("theme-link");
const temples = [
    document.getElementById("break1"),
    document.getElementById("break2"),
    document.getElementById("break3")
];

theme90.addEventListener("click", (e) => {
    e.preventDefault();

    // cambia il CSS
    themeLink.href = "Themes/90s.css";

    // aggiorna le immagini dei separatori
    temples[0].src = "imgs/90s_img1.png";
    temples[1].src = "imgs/90s-centro-colonna.png";
    temples[2].src = "imgs/90s-fine-colonne.png";
});
