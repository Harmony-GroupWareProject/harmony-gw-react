import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TemplateEditor = ({ templateId }) => {
  const [template, setTemplate] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (templateId) {
      axios.get(`http://localhost:9000/templates/${templateId}`, {
        headers: {
          'Authorization': token
        }
      })
        .then(response => {
          setTemplate(response.data);
          setContent(response.data.content);
        })
        .catch(error => console.error('Error fetching template:', error));
    }
  }, [templateId]);

  useEffect(() => {
    if (template) {
      const editorElements = document.querySelectorAll('.comp_editor');
      editorElements.forEach(element => {
        const editorContainer = document.createElement('div');
        element.parentNode.replaceChild(editorContainer, element);

        ReactDOM.render(
          <ReactQuill
            value={element.innerHTML}
            onChange={(value) => element.innerHTML = value}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link', 'image']
              ],
            }}
          />,
          editorContainer
        );
      });
    }
  }, [template]);

  return (
    <div>
      {template ? (
        <div>
          {/* <h2>{template.name}</h2> */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      ) : (
        <p>Select a template to view</p>
      )}
    </div>
  );
};

export default TemplateEditor;
