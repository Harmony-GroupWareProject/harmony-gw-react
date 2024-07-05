// src/App.js
import React, { useState } from 'react';
import TemplateList from '../../../components/Approval/DocTemplate/TempleteList';
import TemplateEditor from '../../../components/Approval/DocTemplate/TemplateEditor';
import { useLocation } from 'react-router-dom';

function DocAddPage() {
  const location = useLocation();
  const {selectedTemplateId} = location.state || {};
  console.log(selectedTemplateId);
  console.log(location);
  return (
    <div className="docAdd">
      <h1>Approval Form</h1>
      {selectedTemplateId && <TemplateEditor templateId={selectedTemplateId} />}
    </div>
  );
}

export default DocAddPage;
