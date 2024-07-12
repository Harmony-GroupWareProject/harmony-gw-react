import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DocPageCoop from './DocPageCoop';
import MainMenuSidebar from '../../Main/MainMenuSidebar';
import styled from 'styled-components';

const TemplateEditor = ({ templateId }) => {
  // const [template, setTemplate] = useState(null);
  // const [content, setContent] = useState('');

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (templateId) {
  //     axios.get(`http://localhost:9000/templates/${templateId}`, {
  //       headers: {
  //         'Authorization': token
  //       }
  //     })
  //       .then(response => {
  //         setTemplate(response.data);
  //         setContent(response.data.content);
  //       })
  //       .catch(error => console.error('Error fetching template:', error));
  //   }
  // }, [templateId]);


  // const saveDocHandler = async () => {
  //   const token = localStorage.getItem("token");
  //   const empNo = localStorage.getItem("empNo");
  //   const docContent = document.getElementById('docContent').innerHTML;

  
  //   const save = {
  //     docType: "DFS",
  //     writer: empNo,
  //     docTitle:"afgagf",
  //     docContent: docContent,
  //     references: "Daff,dfa,df,af",
  //     approvers: "Daff,dfa,df,af",
  //   }
  //   try {
  //     const response = await axios.post('http://localhost:9000/saveApprovalDoc', save, {
  //       headers: {
  //         // 'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
      
      
  //     console.log("success");
  //   } catch (error) {
  //    console.log("fail");
     
  //   }
  // };

  return (
    <div>
    <RegisterForm>
      <MainMenuSidebar></MainMenuSidebar>
      <DocPageCoop />
      {/* {template ? (
        <>
          <div id="docContent">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </>
      ) : (
        <p>Select a template to view</p>
      )}
      <button onClick={saveDocHandler}>저장</button> */}
          
    </RegisterForm>
    </div>
  );
};

export default TemplateEditor;

export const RegisterForm=styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`
