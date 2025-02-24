import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/TemplateModal.css';

Modal.setAppElement('#root');

const TemplateModal = ({ isOpen, modalClose, onSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:9000/templates', {
      headers: {
        'Authorization': token
      }
    })
    // .then(response => setTemplates(response.data))
    .catch(error => console.error('Error fetching templates:', error));
  }, []);

  const handleTemplateSelect = (templateId) => {
    console.log('Template selected:', templateId);
    setSelectedTemplateId(templateId);
  };

  // const handleConfirm = () => {
  //   if (selectedTemplateId) {
  //     console.log('Confirm clicked with templateId:', selectedTemplateId);
  //     onSelect(selectedTemplateId);
  //     modalClose();
  //     // navigate(`/templates/${selectedTemplateId}`); // 페이지 이동
  //   }
  //   navigate('/templateeditor');
  // };

  const handleLink = () => {
    modalClose();
    navigate("/templateeditor"); // 페이지 이동
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={modalClose}
      contentLabel="결재양식 선택"
      className="template-modal"
      overlayClassName="overlay"
    >
      <div className="template-modal-header">
        <h2>결재양식 선택</h2>
        <button className="close-btn" onClick={modalClose}>&times;</button>
      </div>
      <div className="template-modal-body">
        <div className="template-modal-sidebar">
          <ul>
            <li>
                <button>
                  업무협조문
                </button>
            </li>
            {/* {templates.map(template => (
              <li key={template.id}>
                <button
                  className={`doc-template ${selectedTemplateId === template.id ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  {template.name}
                </button>
              </li>
            ))} */}
          </ul>
        </div>
        <div className="template-modal-content">
          <div className='detail-bar'>
            <h3>상세정보</h3>
          </div>
          <div>
            <div className="form-group">
              <label>제목</label>
              <p>휴가신청서</p>
            </div>
            <div className="form-group">
              <label>전사문서함</label>
              <p></p>
            </div>
            <div className="form-group">
              <label>보존연한</label>
              <p>5년</p>
            </div>
            <div className="form-group">
              <label>기안부서</label>
              <select>
                <option value="경영지원본부">경영지원본부</option>
              </select>
            </div>
            <div className="form-group">
              <label>부서문서함</label>
              <select>
                <option value="미지정">미지정</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="template-modal-footer">
        {/* <button onClick={handleConfirm}>확인</button> */}
        <button onClick={handleLink}>확인</button>
        <button onClick={modalClose}>취소</button>
      </div>
    </Modal>
  );
};

export default TemplateModal;
