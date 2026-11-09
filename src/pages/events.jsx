import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        throw error;
      }

      setEvents(data || []);
    } catch (err) {
      console.log("Error fetching events:", err);
      setError("Unable to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  if (error) {
    return (
      <div className="events-container">
        <h2>{error}</h2>
        <button onClick={getEvents}>Try Again</button>
      </div>
    );
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
              <p>📅 {event.date}</p>
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