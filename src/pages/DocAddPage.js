// src/App.js
import React, { useState } from 'react';
import TemplateList from '../components/DocTemplate/TempleteList';
import TemplateEditor from '../components/DocTemplate/TemplateEditor';


function DocAddPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  return (
    <div className="docAdd">
      <h1>Approval Form</h1>
      <TemplateList onSelect={setSelectedTemplateId} />
      {selectedTemplateId && <TemplateEditor templateId={selectedTemplateId} />}
    </div>
  );
}

export default DocAddPage;
