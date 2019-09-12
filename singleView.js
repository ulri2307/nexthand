let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let varer;

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    const jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1mMZ6UI2-PXD05ApvpFvcxDUxDIGkskqlYwOtrnWw4FU/od6/public/values?alt=json");
    varer = await jsonData.json();
    visVare();
    document.querySelector(".luk").addEventListener("click", () => {
        history.back();
    })
}

function visVare() {
    varer.feed.entry.forEach((vare) => {
        if (vare.gsx$id.$t == id) {
            document.querySelector(".billede").src = `nexthand_pics/${vare.gsx$billede.$t}.png`;
            document.querySelector(".navn").textContent = vare.gsx$navn.$t;
            document.querySelector(".lang").textContent = vare.gsx$lang.$t;
            document.querySelector(".pris").textContent = `${vare.gsx$pris.$t}`;
        }
    })
}
