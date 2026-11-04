import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Events from './pages/events';

function Home() {
return (
<>
<section className="hero" id="home">
<h1>Welcome to GreenLeaf Community Garden</h1>
<p>Join us in cultivating a greener community!</p>

    <a href="mailto:naeemhaider176@gmail.com" className="button">
      Contact Us
    </a>
  </section>

  <section className="info" id="events">
    <h2>Community Events</h2>
    <p>
      Join our community gardening events and help make
      our environment greener and healthier.
    </p>
    <Link to="/events" className="button">
      Explore Events
    </Link>
  </section>

  <section className="volunteer" id="volunteer">
    <h2>Become a Volunteer</h2>
    <p>
      Become a part of GreenLeaf and help us build
      a beautiful and green community.
    </p>
  </section>
</>

);
}

function App() {
return (
<BrowserRouter>
<div className="App">

    <header className="App-header">
      <div className="logo">
        <img src="/leaf.png" alt="GreenLeaf Logo" />
        <h2><b><i>GreenLeaf</i></b></h2>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <a href="/#volunteer">Volunteer</a>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />} />
    </Routes>

    <footer>
      <p>2026 GreenLeaf Community Garden. All rights reserved.</p>
    </footer>

  </div>
</BrowserRouter>

);
}

export default App;