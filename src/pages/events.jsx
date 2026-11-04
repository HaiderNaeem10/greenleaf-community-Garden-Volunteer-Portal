import React from "react";
import events from "../data/events.json";

function Events() {
  return (
    <div className="events-container">
      <h1>Upcoming Garden Events 🌱</h1>

      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p className="event-date">📅 {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;