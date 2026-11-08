import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.log("Error fetching events:", error);
    } else {
      setEvents(data);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  return (
    <div className="events-container">
      <h1>Upcoming Garden Events 🌱</h1>

      <div className="events-list">
        {events.length === 0 ? (
          <p>No events available yet.</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <h2>{event.title}</h2>
              <p className="event-date">📅 {event.date}</p>
              <p>{event.description}</p>
              <p>📍 {event.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;