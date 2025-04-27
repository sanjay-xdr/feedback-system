// App.js - Updated main application component with centered layout
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {


  return (
    <Router>
      <div className="app">
        <header>
          <div className="container">
            <h1>Feedback Portal</h1>
            <nav>
              <Link to="/" className="nav-link">Submit Feedback</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </nav>
          </div>
        </header>
        
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<FeedbackForm />} />
              <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
          </div>
        </main>
        
        <footer>
          <div className="container">
            <p>© {new Date().getFullYear()} Feedback System</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;