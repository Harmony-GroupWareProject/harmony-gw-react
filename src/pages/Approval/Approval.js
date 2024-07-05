// src/App.js
import React from 'react';
import Sidebar from '../../components/Approval/AprSidebar';
import AprNavbar from '../../components/Approval/AprNavbar';
import Content from '../../components/Approval/AprContent';
import '../css/Approval.css';
import TemplateModal from '../../components/Approval/DocTemplate/TemplateModal'

const Approval = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <AprNavbar />
        <Content />
        <TemplateModal />
      </div>
    </div>
  );
};

export default Approval;
