// src/App.js
import React from 'react';
import Sidebar from '../components/AprSidebar';
import Navbar from '../components/AprNavbar';
import Content from '../components/AprContent';
import './css/Approval.css';

const Approval = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default Approval;
