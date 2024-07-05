// src/components/Sidebar.js
import React from 'react';
import '../css/AprSidebar.css';

const AprSidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-category">
        <h2 className="sidebar-title">Categories</h2>
      </div>
      <div className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item">상신함</li>
          <li className="sidebar-item">승인함</li>
          <li className="sidebar-item">미결재함</li>
          <li className="sidebar-item">결재함</li>
        </ul>
      </div>
    </div>
  );
};

export default AprSidebar;
