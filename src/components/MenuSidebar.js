import React from 'react';
import './css/MenuSidebar.css';

function MenuSidebar({ setActiveMenu, handleLogout }) {
  return (
    <div className="menu-sidebar">
      <div className="logo-container">
        <img id="menulogo" src="./adaptive-icon.png" alt="Logo" />
        <h3 id='menu-title'>Harmony</h3>
      </div>
      <ul>
        <li><button onClick={() => setActiveMenu('schedule')}>
          <span className='ulList'>일정</span></button></li>
        <li><button onClick={() => setActiveMenu('organization')}>
          <span className='ulList'>조직도 사원</span></button></li>
        <li><button onClick={() => setActiveMenu('approval')}>
          <span className='ulList'>결재</span></button></li>
        <li><button onClick={() => setActiveMenu('hometest')}>
          <span className='ulList'>메뉴4</span></button></li>
      </ul>
      <button id="logout-Button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MenuSidebar;
