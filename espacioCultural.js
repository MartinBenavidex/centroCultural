        const eventosCulturales = [];

        function agregarEvento() {
            const nombre = document.getElementById("nombre").value;
            const fecha = document.getElementById("fecha").value;
            const descripcion = document.getElementById("descripcion").value;

            const evento = {
                nombre,
                fecha,
                descripcion,
            };

            eventosCulturales.push(evento);

            alert(`¡El evento "${nombre}" ha sido agregado correctamente!`);
            actualizarEventosDropdown();
        }

        function mostrarEventos() {
            const listaEventos = document.getElementById("listaEventos");
            listaEventos.innerHTML = "";

            if (eventosCulturales.length === 0) {
                alert("No hay eventos disponibles en este momento.");
            } else {
                eventosCulturales.forEach((evento, index) => {
                    const li = document.createElement("li");
                    li.textContent = `${index + 1}. ${evento.nombre} - ${evento.fecha}`;
                    listaEventos.appendChild(li);
                });
            }
        }

        function actualizarEventosDropdown() {
            const eventoSeleccionado = document.getElementById("eventoSeleccionado");
            eventoSeleccionado.innerHTML = "";

            eventosCulturales.forEach((evento, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = evento.nombre;
                eventoSeleccionado.appendChild(option);
            });
        }

        function agregarAlCarrito() {
            const eventoSeleccionado = document.getElementById("eventoSeleccionado").value;
            const totalCarritoElement = document.getElementById("totalCarrito");

            if (eventoSeleccionado !== "") {
                totalCarrito += 1000; // Precio de la entrada en pesos argentinos
                totalCarritoElement.textContent = totalCarrito;
                Swal.fire({
                    icon: 'success',
                    title: 'Entrada sumada al carrito',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        function abonarReservas() {
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

                        totalCarrito = 0;
                        document.getElementById("totalCarrito").textContent = totalCarrito;
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


        let darkMode = false;

        function alternarDarkMode() {
            darkMode = !darkMode;
            cambiarColorFondo();
        }

        function cambiarColorFondo() {
            const body = document.body;
            if (darkMode) {
                body.style.backgroundColor = "darkgray";
            } else {
                body.style.backgroundColor = "#f9f9f9";
            }
        }
        let totalCarrito = 0;
