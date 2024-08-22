import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CalendarComponent from "../components/CalendarComponent";
import Modal from "../components/CalendarModal";

function ActivitiesPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error al obtener los eventos");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  console.log(events);

  return (
    <main className="activitiesPage">
      <NavBar />
      <CalendarComponent events={events} onEventClick={handleEventClick} />
      {isModalOpen && (
        <Modal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </main>
  );
}

export default ActivitiesPage;
