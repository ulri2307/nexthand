let alleRetter = [];
let filter = "alle";

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    alleRetter = await jsonData.json();
    visRetter();
    addEventListenersToButtons();
}

function visRetter() {
    const container = document.querySelector(".data");
    const templateContainer = document.querySelector("template");
    container.innerHTML = "";

    alleRetter.feed.entry.forEach((ret) => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            let klon = templateContainer.cloneNode(true).content;
            klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;
            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
            klon.querySelector(".pris").textContent = `Pris: ${ret.gsx$pris.$t}kr.`;
            container.appendChild(klon);

            container.lastElementChild.addEventListener("click", () => {
                location.href = `singleView_site.html?navn=${ret.gsx$navn.$t}`;
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
    visRetter();
}
