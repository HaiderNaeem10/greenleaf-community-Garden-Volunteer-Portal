import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function Volunteer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, title")
      .order("date", { ascending: true });

    if (error) {
      console.log(error);
      setMessage("Could not load events.");
    } else {
      setEvents(data);
    }

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setMessage("");

    const { error } = await supabase
      .from("volunteers")
      .insert([
        {
          name: name,
          email: email,
          event_id: selectedEvent
        }
      ]);

    if (error) {
      console.log("Registration error:", error);
      setMessage("Registration failed. Please try again.");
    } else {
      setMessage("Thank you, " + name + "! Registration successful.");

      setName("");
      setEmail("");
      setSelectedEvent("");
    }

    setSubmitting(false);
  }

  return (
    <div className="volunteer-container">
      <h1>Volunteer Sign-up 🌱</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          pattern="[A-Za-z ]+"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Select Event:</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          required
        >
          <option value="">
            {loading ? "Loading events..." : "Choose an event"}
          </option>

          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading || submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <h3>{message}</h3>}
    </div>
  );
}

export default Volunteer;