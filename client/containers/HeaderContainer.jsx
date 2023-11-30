import React from 'react';
import PopupForm from '../components/PopupForm.jsx';

const HeaderContainer = () => {
  function darkMode() {
    document.body.classList.toggle('dark-theme');
  }
  return (
    <div className='headerContainer'>
      <button className='btn-toggle' onClick={darkMode}>
        Dark-Mode
      </button>
      <h1 id='header'>Job Application Tracker</h1>
      <PopupForm />
    </div>
  );
};

export default HeaderContainer;
