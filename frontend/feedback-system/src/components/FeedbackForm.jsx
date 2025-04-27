// components/FeedbackForm.js - Updated with better centering
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const FeedbackForm = () => {
  const initialFormState = {
    userName: '',
    email: '',
    feedbackText: '',
    category: 'suggestion'
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.feedbackText.trim()) {
      newErrors.feedbackText = 'Feedback text is required';
    } else if (formData.feedbackText.trim().length < 10) {
      newErrors.feedbackText = 'Feedback must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const timestamp = new Date().toISOString();
      const feedbackData = { ...formData, timestamp };
      
      try {
        const response = await fetch(`http://localhost:3000/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }
        setFormData(initialFormState);
        setSubmitted(true);
  
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };
  

  return (
    <div className="content-container">
      <div className="card feedback-form-container">
        <h2>Share Your Feedback</h2>
        <p className="subtitle">We value your input to improve our services</p>
        
        {submitted && (
          <div className="success-message">
            <CheckCircle size={20} />
            <span>Feedback submitted successfully!</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.userName ? 'error' : ''}
            />
            {errors.userName && <span className="error-text">{errors.userName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="feedbackText">Your Feedback</label>
            <textarea
              id="feedbackText"
              name="feedbackText"
              value={formData.feedbackText}
              onChange={handleChange}
              placeholder="Please share your thoughts..."
              rows="5"
              className={errors.feedbackText ? 'error' : ''}
            ></textarea>
            {errors.feedbackText && <span className="error-text">{errors.feedbackText}</span>}
          </div>
          
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;