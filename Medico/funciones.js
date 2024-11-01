document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Días y horarios de atención
    const daysOfWeek = [1, 2, 3]; // 1 = lunes, 2 = martes, 3 = miércoles
    const startTime = "09:00";
    const endTime = "13:00";
    const duration = 20; // Duración de cada cita en minutos

    // Ejemplo de citas
    const appointments = [
      { date: '2024-11-04', time: '09:00', patient: 'Juan Pérez' },
      { date: '2024-11-04', time: '09:20', patient: 'Ana Martínez' },
      { date: '2024-11-04', time: '09:40', patient: 'Carlos Gómez' },
      { date: '2024-11-06', time: '11:20', patient: 'Lucía Morales' }
    ];

    // Función para calcular la hora de finalización de la cita
    function calculateEndTime(startTime, duration) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const endDate = new Date(1970, 0, 1, hours, minutes + duration);
      return endDate.toTimeString().slice(0, 5); // Formato HH:MM
    }

    // Convierte las citas en eventos de calendario con hora de fin y nombre del paciente
    const events = appointments.map(appointment => {
      const endTime = calculateEndTime(appointment.time, duration);
      return {
        title: appointment.patient,
        start: `${appointment.date}T${appointment.time}`,
        end: `${appointment.date}T${endTime}`,
        color: '#FFDD57',
        extendedProps: { 
          patient: appointment.patient,
          time: appointment.time
        }
      };
    });

    // Configuración del calendario
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      locale: 'es',
      slotMinTime: startTime,
      slotMaxTime: endTime,
      slotDuration: '00:20:00',
      slotLabelInterval: { minutes: 20 },
      selectable: true,
      events: events,
      eventOverlap: false,
      slotLabelFormat: {
        hour: '2-digit', 
        minute: '2-digit', 
        omitZeroMinute: false, 
        meridiem: false // Muestra las horas en formato 24 horas
      },
      dateClick: function(info) {
        const isWorkDay = daysOfWeek.includes(info.date.getDay());
        if (isWorkDay) {
          const dailyAppointments = appointments.filter(appointment => appointment.date === info.dateStr);
          const scheduleContent = dailyAppointments.length > 0
            ? dailyAppointments.map(app => `<p><strong>${app.time}</strong> - ${app.patient}</p>`).join('')
            : '<p>No hay citas para este día.</p>';
          
          document.getElementById('scheduleContent').innerHTML = scheduleContent;
          document.getElementById('overlay').style.display = 'block';
          document.getElementById('modal').style.display = 'block';
        }
      },
      eventClick: function(info) {
        const patientName = info.event.extendedProps.patient;
        const appointmentTime = info.event.extendedProps.time;

        const appointmentDetails = `
          <h4>Detalles de la Cita</h4>
          <p><strong>Paciente:</strong> ${patientName}</p>
          <p><strong>Hora:</strong> ${appointmentTime}</p>
        `;
        
        document.getElementById('scheduleContent').innerHTML = appointmentDetails;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
      },
      validRange: function(nowDate) {
        const endDate = new Date(nowDate);
        endDate.setMonth(nowDate.getMonth() + 1);
        return { start: nowDate, end: endDate };
      },
      dayCellDidMount: function(info) {
        const dayOfWeek = info.date.getDay();
        if (!daysOfWeek.includes(dayOfWeek)) {
          info.el.classList.add('fc-day-disabled');
        }
      }
    });

    calendar.render();
  });

  function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
  }
