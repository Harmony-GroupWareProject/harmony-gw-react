import React from 'react';
import Modal from 'react-modal';
import '../../css/TemplateModal.css'

Modal.setAppElement('#root');


const TemplateModal = ({ isOpen, modalClose }) => (
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
          <li>휴가</li>
          <li>기타</li>
          <li>종류</li>
        </ul>
      </div>
      <div className="template-modal-content">
        <h3>상세정보</h3>
        <div className="form-group">
          <label>제목</label>
          <input type="text" value="휴가신청서" readOnly />
        </div>
        <div className="form-group">
          <label>전사문서함</label>
          <input type="text" value="" />
        </div>
        <div className="form-group">
          <label>보존연한</label>
          <input type="text" value="5년" readOnly />
        </div>
        <div className="form-group">
          <label>기안부서</label>
          <select>
            <option value="경영지원본부">경영지원본부</option>
          </select>
        </div>
        <div className="form-group">
          <label>부서선택</label>
          <select>
            <option value="미지정">미지정</option>
          </select>
        </div>
      </div>
    </div>
    <div className="template-modal-footer">
      <button onClick={modalClose}>확인</button>
      <button onClick={modalClose}>취소</button>
    </div>
  </Modal>
);

export default TemplateModal;
