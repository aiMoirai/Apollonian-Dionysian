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
