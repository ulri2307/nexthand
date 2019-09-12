let alleVarer = [];
let filter = "alle";

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1mMZ6UI2-PXD05ApvpFvcxDUxDIGkskqlYwOtrnWw4FU/od6/public/values?alt=json");
    alleVarer = await jsonData.json();
    visVarer();
    addEventListenersToButtons();
}

function visVarer() {
    const container = document.querySelector(".data");
    const templateContainer = document.querySelector("template");
    container.innerHTML = "";

    alleVarer.feed.entry.forEach((vare) => {
        if (filter == "alle" || filter == vare.gsx$kategori.$t) {
            let klon = templateContainer.cloneNode(true).content;
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
}

function filtrering() {
    filter = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visVarer();
}
