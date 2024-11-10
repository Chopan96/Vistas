    // Función para validar el RUT (formato básico sin conexión a base de datos)
    function validarRUT() {
        const rutInput = document.getElementById("rutMedico");
        const rut = rutInput.value;
        const rutPattern = /^\d{7,8}-[0-9Kk]$/; // Formato simple de RUT

        if (!rutPattern.test(rut)) {
            rutInput.classList.add("is-invalid");
            return false;
        } else {
            rutInput.classList.remove("is-invalid");
            return true;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Definimos los horarios de los médicos
        const horariosMedicos = {
            'medico1': [
                { day: 1, start: "09:00", end: "13:00" },  // Lunes
                { day: 3, start: "09:00", end: "13:00" }   // Miércoles
            ],
            'medico2': [
                { day: 2, start: "10:00", end: "15:00" },  // Martes
                { day: 4, start: "10:00", end: "15:00" }   // Jueves
            ]
        };
    
        // Función para mostrar el horario del médico seleccionado
        function mostrarHorario(idMedico) {
            document.getElementById('nombre-medico').innerText = idMedico === 'medico1' ? 'Dr. Juan Pérez' : 'Dra. María González';
            document.getElementById('modal-horario').style.display = 'block';  // Mostrar el modal
    
            const calendarEl = document.getElementById('calendar');
            calendarEl.innerHTML = '';  // Limpiar cualquier contenido previo
    
            const horarios = horariosMedicos[idMedico];
            
            // Convertir los horarios en eventos para FullCalendar
            const events = horarios.map(horario => {
                return {
                    daysOfWeek: [horario.day],
                    startTime: horario.start,
                    endTime: horario.end,
                    display: 'background',
                    color: '#28a745'  // Color verde
                };
            });
    
            // Configuración del calendario con FullCalendar
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                locale: 'es',
                events: events,
                allDaySlot: false,
                height: 'auto',
                slotDuration: '00:20:00',
                slotLabelInterval: { minutes: 20 },
                slotMinTime: '08:00:00',
                slotMaxTime: '18:00:00',
                slotLabelFormat: {
                    hour: '2-digit', 
                    minute: '2-digit', 
                    omitZeroMinute: false, 
                    meridiem: false // Muestra las horas en formato 24 horas
                },
                headerToolbar: { start: '', center: 'title', end: '' },
            });
    
            calendar.render();  // Renderiza el calendario
        }
    
        // Función para cerrar el modal
        function cerrarModal() {
            document.getElementById('modal-horario').style.display = 'none';  // Ocultar el modal
        }
    
        // Exponer las funciones para que se puedan usar en el HTML
        window.mostrarHorario = mostrarHorario;
        window.cerrarModal = cerrarModal;
    });
    
    