document.addEventListener("DOMContentLoaded", function () {
    const agendaList = document.getElementById("agendaList");
    const eventosCulturales = JSON.parse(localStorage.getItem('eventos')) || [];
    mostrarEventos();

    function mostrarEventos() {
        agendaList.innerHTML = "";
        eventosCulturales.forEach((evento, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${evento.nombre} - ${evento.fecha}`;
            agendaList.appendChild(li);
        });
    }
});

const volverAlIndiceBtn = document.getElementById("volverAlIndex");
volverAlIndiceBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});
