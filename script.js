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
                img.src = toggle.checked ? "" : "imgs/sopra colonna.png";
                break;
            case 1:
                img.src = toggle.checked ? "" : "imgs/centro colonna.png";
                break;
            case 2:
                img.src = toggle.checked ? "" : "imgs/fine colonne.png";
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