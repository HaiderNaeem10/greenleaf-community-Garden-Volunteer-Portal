
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>GreenLeaf </h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#volunteer">Volunteer</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <h1>Welcome to GreenLeaf Community Garden</h1>
        <p>Join us in cultivating a greener community!</p>

        <a href="mailto:naeemhaider176@gmail.com">
          <button className="button">Contact Us</button>
        </a>
      </section>

      <footer>
        <p>2026 GreenLeaf Community Garden. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
