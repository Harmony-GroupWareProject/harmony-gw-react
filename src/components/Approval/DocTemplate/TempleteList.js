// src/components/TemplateList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateList = ({ onSelect }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:9000/templates', {
      headers: {
          'Authorization': token
      }
  })
      .then(response => setTemplates(response.data) & console.log(response))
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  return (
    <div>
      <h2>Template List</h2>
      <ul>
        {templates.map(template => (
          <li key={template.id}>
            <button onClick={() => onSelect(template.id)}>{template.name}</button>
            <button onClick={() => console.log(templates)}>찍어보기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
