import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">

        <div className="logo">
          <img src="/leaf.png" alt="GreenLeaf Logo" />
          <h2><b><i>GreenLeaf</i></b></h2>
        </div>
<nav>
  <a href="/home">Home</a>
  <a href="/events">Events</a>
  <a href="/volunteer">Volunteer</a>
</nav>

      </header>

      <section className="hero" id="home">
        <h1>Welcome to GreenLeaf Community Garden</h1>

        <p>Join us in cultivating a greener community!</p>

        <a href="mail:naeemhaider176@gmail.com" className="button">
          Contact Us
        </a>
      </section>
      <section className="info" id="events">
        <h2>Community Events</h2>
        <p>
          Join our community gardening events and help make
          our environment greener and healthier.
        </p>
      </section>

      <section className="volunteer" id="volunteer">
        <h2>Become a Volunteer</h2>
        <p>
          Become a part of GreenLeaf and help us build
          a beautiful and green community.
        </p>
      </section>

      <footer>
        <p>2026 GreenLeaf Community Garden. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;