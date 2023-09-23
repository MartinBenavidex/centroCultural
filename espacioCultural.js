document.addEventListener("DOMContentLoaded", function () {
    const d = document;
    const eventosCulturales = JSON.parse(localStorage.getItem('eventos')) || [];
    const listaEventos = d.getElementById("listaEventos");
    const eventoSeleccionado = d.getElementById("eventoSeleccionado");
    const totalCarritoElement = d.getElementById("totalCarrito");
    const generarEventoBtn = d.getElementById("generarEventoBtn");
    const nombreInput = d.getElementById("nombre");
    const fechaInput = d.getElementById("fecha");
    const descripcionInput = d.getElementById("descripcion");
    const searchForm = d.getElementById("searchForm");

    generarEventoBtn.addEventListener("click", agregarEvento);

    function generarEventoFicticio() {
        const nombreEvento = faker.company.companyName();
        const fechaEvento = faker.date.future();
        const descripcionEvento = faker.lorem.sentence();

        return {
            nombre: nombreEvento,
            fecha: fechaEvento,
            descripcion: descripcionEvento,
        }
    }

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreBusqueda = nombreInput.value.trim();
        const fechaBusqueda = fechaInput.value;

        const resultadosFiltrados = eventosCulturales.filter(evento => {
            const nombreCoincide = evento.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase());
            const fechaCoincide = fechaBusqueda === "" || evento.fecha.includes(fechaBusqueda);
            return nombreCoincide && fechaCoincide;
        });

        mostrarResultados(resultadosFiltrados);
    });

    function mostrarResultados(resultadosArray) {
        resultados.innerHTML = "";

        if (resultadosArray.length === 0) {
            resultados.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        resultadosArray.forEach((evento, index) => {
            const li = document.createElement("li");
            li.textContent = `${evento.nombre} - ${evento.fecha}`;
            resultados.appendChild(li);

            // Agregar botón "Reservar entrada" con atributo data-event-index
            const reservarEntradaBtn = document.createElement("button");
            reservarEntradaBtn.textContent = "Reservar entrada";
            reservarEntradaBtn.classList.add("reservar-entrada-btn");
            reservarEntradaBtn.setAttribute("data-event-index", index);
            li.appendChild(reservarEntradaBtn);
        });

        // Agrega un event listener para los botones "Reservar entrada" una vez que se muestran los resultados
        const reservarEntradaBtns = document.querySelectorAll(".reservar-entrada-btn");
        reservarEntradaBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                agregarAlCarrito(eventosCulturales, btn.getAttribute("data-event-index"));
            });
        });
    }

    function agregarEvento() {
        const evento = generarEventoFicticio();
        eventosCulturales.push(evento);
        localStorage.setItem('eventos', JSON.stringify(eventosCulturales));
        mostrarEventos();
        actualizarEventosDropdown();
    }

    function actualizarEventosDropdown() {
        eventoSeleccionado.innerHTML = "";

        eventosCulturales.forEach((evento, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = evento.nombre;
            eventoSeleccionado.appendChild(option);
        });
    }

    function agregarAlCarrito(eventos, index) {
        if (index !== "") {
            const eventoSeleccionadoIndex = parseInt(index);

            if (eventoSeleccionadoIndex >= 0 && eventoSeleccionadoIndex < eventos.length) {
                const eventoSeleccionado = eventos[eventoSeleccionadoIndex];
                console.log("Evento seleccionado:", eventoSeleccionado);

                totalCarritoElement.textContent = `${parseInt(totalCarritoElement.textContent) + 1000}`;
                Swal.fire({
                    icon: 'success',
                    title: 'Entrada sumada al carrito',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error("Índice de evento no válido.");
            }
        }
    }
    function abonarReservas() {
        const totalCarrito = parseInt(totalCarritoElement.textContent);
    
        if (totalCarrito > 0) {
            Swal.fire({
                title: 'Abonar Reservas',
                text: `El total a abonar es: ${totalCarrito} pesos argentinos`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reservas abonadas correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
    
                    totalCarritoElement.textContent = '0';
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'El carrito está vacío',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    
    const abonarReservasBtn = document.getElementById("abonarReservasBtn");
    abonarReservasBtn.addEventListener("click", abonarReservas);

    const agendaCultural = document.getElementById("agendaCultural");
    agendaCultural.addEventListener("click", function () {
        window.location.href = "agenda.html";
    });

    mostrarEventos();
});
