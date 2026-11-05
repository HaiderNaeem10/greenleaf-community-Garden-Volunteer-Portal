import React, { useState } from "react";
import events from "../data/events.json";

function Volunteer() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !selectedEvent) {
      alert("Please fill all fields!");
      return;
    }

    const volunteer = {
      name: name,
      email: email,
      event: selectedEvent
    };

    // Get existing volunteers
    const oldData = JSON.parse(
      localStorage.getItem("volunteers") || "[]"
    );

    // Add new volunteer
    oldData.push(volunteer);

    // Save data in localStorage
    localStorage.setItem(
      "volunteers",
      JSON.stringify(oldData)
    );

    // Show confirmation
    setMessage("Thank you, " + name + "!");

    // Clear form
    setName("");
    setEmail("");
    setSelectedEvent("");
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
  title="Name should contain letters only"
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
          <option value="">Choose an event</option>

          {events.map((event) => (
            <option key={event.id} value={event.title}>
              {event.title}
            </option>
          ))}

        </select>

        <button type="submit">
          Submit
        </button>

      </form>

      {message && <h3>{message}</h3>}

    </div>
  );
}

export default Volunteer;