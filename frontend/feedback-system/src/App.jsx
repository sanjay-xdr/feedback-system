// App.js - Updated main application component with centered layout
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [feedbackData, setFeedbackData] = useState([]);

  // 👇 Fetch feedback from backend on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      console.log('Fetching feedback...');
      try {
        const res = await fetch('http://localhost:3000/feedback'); // 🔥 Your backend URL here
        const result = await res.json();
console.log('Feedback fetched:', result);
        setFeedbackData(result.data.feedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const addFeedback = (newFeedback) => {
    setFeedbackData([...feedbackData, { ...newFeedback, id: Date.now() }]);
  };

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
              <Route path="/" element={<FeedbackForm addFeedback={addFeedback} />} />
              <Route path="/dashboard" element={<Dashboard feedbackData={feedbackData} />} />
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