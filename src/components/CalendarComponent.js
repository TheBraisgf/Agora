import React, { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./CalendarModal"; // Asegúrate de tener el componente Modal

const locales = {
  es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (response.ok) {
        const data = await response.json();
        setCalendarEvents(
          data.map((event) => ({
            id: event._id,
            title: event.name,
            start: new Date(event.date),
            end: new Date(event.date),
            location: event.location,
            totalUsers: event.totalUsers,
            hobby: event.hobby,
          }))
        );
      } else {
        console.error("Error al obtener los eventos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    fetchEvents(); // Vuelve a cargar los eventos para asegurar que estén actualizados
  };

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={handleSelectEvent} // Manejar selección de eventos
        views={["month", "week", "day"]}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#3174ad", // Personalizar color de los eventos
            color: "white",
            borderRadius: "0px",
          },
        })}
      />

      {isModalOpen && (
        <Modal
          event={selectedEvent}
          onClose={handleCloseModal}
          onRegisterSuccess={fetchEvents} // Pasa la función para actualizar eventos al modal
        />
      )}
    </div>
  );
};

export default CalendarComponent;
