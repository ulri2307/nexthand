let urlParams = new URLSearchParams(window.location.search);
let navn = urlParams.get("navn");
let retter;

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    retter = await jsonData.json();
    visRet();
    document.querySelector(".luk").addEventListener("click", () => {
        history.back();
    })
}

function visRet() {
    retter.feed.entry.forEach((ret) => {
        if (ret.gsx$navn.$t == navn) {
            document.querySelector(".billede").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
            document.querySelector(".oprindelse").textContent = `Fra vores udvalg af ${ret.gsx$kategori.$t}. Stammer oprindeligt fra ${ret.gsx$oprindelse.$t}.`;
            document.querySelector(".navn").textContent = ret.gsx$navn.$t;
            document.querySelector(".lang").textContent = ret.gsx$lang.$t;
            document.querySelector(".pris").textContent = `Pris: ${ret.gsx$pris.$t}kr.`;
        }
    })
}
