// src/App.js
import { useState } from 'react';
import AprSidebar from '../../components/Approval/AprSidebar';
import AprNavbar from '../../components/Approval/AprNavbar';
import AprContent from '../../components/Approval/AprContent';
import TemplateEditor from '../../components/Approval/DocTemplate/TemplateEditor';
import '../css/Approval.css';
import { useLocation } from 'react-router-dom';

const Approval = () => {
  const location = useLocation();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  return (
    <div className="app">
      <AprSidebar />
      <div className="main-content">
        {!selectedTemplateId ? (
          <>
            <AprNavbar onSelect={setSelectedTemplateId} />
            <AprContent />
          </>
        ) : (
          <>
          <TemplateEditor templateId={selectedTemplateId} />
          </>
        )}
      </div>
    </div>
  );
};

export default Approval;
