import React, { useState } from 'react';
import '../css/AprNavbar.css';
import TemplateModal from './DocTemplate/TemplateModal';

const AprNavbar = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }


  return (
    <div className="navbar">
      <div className="navbar-item">
        <button onClick={openModal}>Write</button>
        <TemplateModal isOpen={modalIsOpen} modalClose={closeModal} />
      </div>
    </div>
  );
};

export default AprNavbar;
