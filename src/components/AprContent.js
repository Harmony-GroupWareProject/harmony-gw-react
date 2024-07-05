// src/components/Content.js
import React from 'react';
import './css/AprContent.css';

const Content = () => {
  return (
    <div className="content">
      <div className="content-menu">
        <div className="content-menu-item">문서번호</div>
        <div className="content-menu-item">제목</div>
        <div className="content-menu-item">작성자</div>
        <div className="content-menu-item">결재일자</div>
        <div className="content-menu-item">결재상태</div>
      </div>
      <div className="content-message">
        <p>결재문서가 없습니다.</p>
      </div>
      <div className="content-search">
        <select>
          <option>작성자</option>
        </select>
        <input type="text" placeholder="검색" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default Content;
