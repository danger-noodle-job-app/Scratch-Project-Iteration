import React from 'react';
import { useState } from 'react';
import PopupForm from '../components/PopupForm.jsx';

const HeaderContainer = ({darkModeButtonClick}) => {

  return (
    <div className='headerContainer'>
      <a href='/auth/google'>Login With Google</a>
      <button className='btn-toggle' onClick={darkModeButtonClick}>
        Dark-Mode
      </button>
      <h1 id='header'>Job Application Tracker</h1>
      <PopupForm />
    </div>
  );
};

export default HeaderContainer;
