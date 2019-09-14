let alleVarer = [];
let filterKategori = "alle";
let filterPrisklasse = "alle";
const container = document.querySelector(".data");
const templateContainer = document.querySelector("template");

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1mMZ6UI2-PXD05ApvpFvcxDUxDIGkskqlYwOtrnWw4FU/od6/public/values?alt=json");
    alleVarer = await jsonData.json();
    visVarer();
    addEventListenersToButtons();
}

function visVarer() {
    container.innerHTML = "";

    alleVarer.feed.entry.forEach(vare => {
        if ((filterKategori == "alle" || filterKategori == vare.gsx$kategori.$t) && (filterPrisklasse == "alle" || filterPrisklasse == vare.gsx$prisklasse.$t)) {
            const klon = templateContainer.cloneNode(true).content;
            klon.querySelector("img").src = `nexthand_pics/${vare.gsx$billede.$t}.png`;
            klon.querySelector(".navn").textContent = vare.gsx$navn.$t;
            klon.querySelector(".kort").textContent = vare.gsx$kort.$t;
            klon.querySelector(".pris").textContent = `${vare.gsx$pris.$t}`;
            container.appendChild(klon);

            container.lastElementChild.addEventListener("click", () => {
                location.href = `singleView.html?id=${vare.gsx$id.$t}`;
            });
        }
    })
}


function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
    document.querySelectorAll(".filter-prisklasse").forEach(elm => {
        elm.addEventListener("click", filtreringPrisklasse);
    })
}

function filtrering() {
    document.querySelector(".filter_prisklasse").classList.remove("hide");

    filterKategori = this.dataset.kategori;
    if (filterKategori == "alle") {
        filterPrisklasse = "alle";
        document.querySelectorAll(".filter-prisklasse").forEach(elm => {
            elm.classList.remove("valgt");
        });
    }
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visVarer();
}


function filtreringPrisklasse() {
    filterPrisklasse = this.dataset.prisklasse;
    let valgtKategori = document.querySelector(".valgt").textContent;
    document.querySelectorAll(".filter-prisklasse").forEach(elm => {
        elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visVarer();
}
