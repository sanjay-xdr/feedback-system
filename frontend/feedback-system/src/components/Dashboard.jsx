// components/Dashboard.js - Updated with better centering
import React, { useState } from 'react';
import { Clock, User, MessageSquare, Tag } from 'lucide-react';

const Dashboard = ({ feedbackData }) => {
  const [filters, setFilters] = useState({
    feedback_type: 'all',
    searchTerm: ''
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = feedbackData.filter(item => {
    const matchesCategory = filters.feedback_type === 'all' || item.feedback_type === filters.feedback_type;
    const matchesSearch = 
      item.user_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.feedback_text.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      case 'bug': return 'bg-red-100 text-red-800';
      case 'feature': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="content-container">
      <div className="card dashboard">
        <h2>Feedback Dashboard</h2>
        
        <div className="dashboard-filters">
          <div className="search-container">
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search feedback..."
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <label htmlFor="category-filter">Filter by:</label>
            <select
              id="category-filter"
              name="feedback_type"
              value={filters.feedback_type}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="suggestion">Suggestions</option>
              <option value="bug">Bug Reports</option>
              <option value="feature">Feature Requests</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        {sortedData.length === 0 ? (
          <div className="no-data">
            <p>No feedback data available.</p>
          </div>
        ) : (
          <div className="feedback-list">
            <div className="sort-header">
              <div className="sort-item" onClick={() => handleSort('created_at')}>
                <Clock size={16} />
                Date {sortConfig.key === 'created_at' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </div>
              <div className="sort-item" onClick={() => handleSort('user_name')}>
                <User size={16} />
                Name {sortConfig.key === 'user_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </div>
              <div className="sort-item" onClick={() => handleSort('feedback_type')}>
                <Tag size={16} />
                Category {sortConfig.key === 'feedback_type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </div>
            </div>
            
            {sortedData.map(item => (
              <div key={item.id} className="feedback-card">
                <div className="feedback-header">
                  <div className="user-info">
                    <h3>{item.user_name}</h3>
                    <span className="email">{item.email}</span>
                  </div>
                  <div className="feedback-meta">
                    <span className={`category-tag ${getCategoryColor(item.feedback_type)}`}>
                      {item.feedback_type.charAt(0).toUpperCase() + item.feedback_type.slice(1)}
                    </span>
                    <span className="timestamp">
                      <Clock size={14} />
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                </div>
                <div className="feedback-content">
                  <MessageSquare size={16} />
                  <p>{item.feedback_text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-value">{feedbackData.length}</span>
            <span className="stat-label">Total Entries</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {feedbackData.filter(item => item.feedback_type === 'suggestion').length}
            </span>
            <span className="stat-label">Suggestions</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {feedbackData.filter(item => item.feedback_type === 'bug').length}
            </span>
            <span className="stat-label">Bug Reports</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {feedbackData.filter(item => item.feedback_type === 'feature').length}
            </span>
            <span className="stat-label">Feature Requests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;