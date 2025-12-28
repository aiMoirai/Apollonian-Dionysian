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
