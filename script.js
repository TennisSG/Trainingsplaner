// 1. TÜRSTEHER (Falls nicht eingeloggt, zurück zum Login index.html)
if (sessionStorage.getItem("auth") !== "true" && !window.location.href.includes("index.html")) {
    window.location.href = "index.html";
}

// 2. MONATS-FILTER & INITIALISIERUNG
// Schnellere Initialisierung
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const monat = urlParams.get('monat');
    
    // Aktuellen Planer-Namen ermitteln
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "").replace("planer-", "STUFE: ").toUpperCase();

    if (monat) {
        const monatDisplay = document.getElementById('display-monat');
        const planerDisplay = document.getElementById('display-planer');
        
        if(monatDisplay) monatDisplay.innerText = "MONAT: " + monat.toUpperCase();
        if(planerDisplay) planerDisplay.innerText = page;
        
        // Übungen sofort filtern
        document.querySelectorAll('.draggable').forEach(el => {
            if (!el.classList.contains(monat)) { 
                el.style.display = 'none'; 
            } else {
                el.style.display = 'block';
            }
        });
    }
});


// 3. TAB-LOGIK & DRAG-DROP
function filterPool(cat, btn) {
    document.querySelectorAll('.pool-content').forEach(el => el.style.display = 'none');
    document.querySelector('.' + cat).style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.setData("text");
    var node = document.getElementById(data).cloneNode(true);
    node.id = "new_" + Math.random(); node.onclick = function() { this.remove(); };
    var target = ev.target;
    while (target && !target.classList.contains('drop-zone')) { target = target.parentElement; }
    if (target) { target.appendChild(node); }
}

// 4. TOUCH SUPPORT NACHLADEN
var ts = document.createElement('script');
ts.src = "https://jsdelivr.net";
document.head.appendChild(ts);

function goBackToStufen() {
    const urlParams = new URLSearchParams(window.location.search);
    const monat = urlParams.get('monat') || 'mai';
    window.location.href = "stufenwahl.html?monat=" + monat;
}