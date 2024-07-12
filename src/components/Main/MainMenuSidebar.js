import React, { useEffect } from 'react';
import '../css/MenuSidebar.css';

function MainMenuSidebar({ setActiveMenu, handleLogout }) {
  const role = localStorage.getItem("role");

  useEffect(() => {
    console.log("role 값 전달 확인" + JSON.stringify(role));
  })
  // const role2 = 'ADMIN';
  return (
    <div className="menu-sidebar">
      <div className="logo-container">
        <img id="menulogo" src="./adaptive-icon.png" alt="Logo" />
        <h3 id='menu-title'>Harmony</h3>
      </div>
      <ul>
        {role==='ADMIN' ? <li><button onClick={() => setActiveMenu('register')}>
        <span className='ulList'>직원 등록</span></button></li> : ''}
        
        <li><button onClick={() => setActiveMenu('schedule')}>
          <span className='ulList'>일정</span></button></li>
        <li><button onClick={() => setActiveMenu('organization')}>
          <span className='ulList'>조직도 사원</span></button></li>
        <li><button onClick={() => setActiveMenu('noticelist')}>
          <span className='ulList'>공지사항</span></button></li>
        <li><button onClick={() => setActiveMenu('approval')}>
          <span className='ulList'>결재</span></button></li>
      </ul>
      <button id="logout-Button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MainMenuSidebar;
