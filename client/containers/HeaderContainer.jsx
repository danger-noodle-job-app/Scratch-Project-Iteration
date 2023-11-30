import React from 'react';
import { useState } from 'react';
import PopupForm from '../components/PopupForm.jsx';

const HeaderContainer = () => {
  // function darkMode() {
  //   document.body.classList.toggle('dark-theme');
  //   if (!document.body.style.backgroundColor) {
  //     document.body.style.backgroundColor = 'rgb(100, 110, 290)';
  //     document.body.querySelector('.btn-toggle').innerHTML = 'Light-Mode';
  //   } else document.body.style.backgroundColor = null;
  //   document.body.querySelector('.btn-toggle').innerHTML = 'Dark-Mode';
  // }
  const [darkMode, setDarkMode] = useState('false');

  return (
    <div className='headerContainer'>
      <button
        className='btn-toggle'
        onClick={() => {
          if (darkMode === 'false') setDarkMode('true');
          setDarkMode('false');
        }}
      >
        Dark-Mode
      </button>
      <h1 id='header'>Job Application Tracker</h1>
      <PopupForm />
    </div>
  );
};

export default HeaderContainer;
