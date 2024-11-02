        // Función para abrir el modal
        function abrirModal() {
            document.getElementById('modalCalendario').style.display = 'flex';
            inicializarCalendario(); // Llama al calendario al abrir el modal
        }

        // Función para cerrar el modal
        function cerrarModal() {
            document.getElementById('modalCalendario').style.display = 'none';
        }

        // Inicializar FullCalendar dentro del modal
        function inicializarCalendario() {
            var calendarEl = document.getElementById('calendar');
            
            // Elimina cualquier instancia de calendario previa para evitar duplicados
            if (calendarEl.innerHTML !== "") calendarEl.innerHTML = "";

            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                locale: 'es',
                height: '100%', // Ajusta el calendario al 100% del modal
                slotMinTime: '09:00',
                slotMaxTime: '17:00',
                selectable: true,
                events: [], // Agrega eventos si los tienes
            });

            calendar.render();
        }