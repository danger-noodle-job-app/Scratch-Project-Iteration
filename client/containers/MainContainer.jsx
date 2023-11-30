import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderContainer from './HeaderContainer.jsx';
import JobContainer from './JobContainer.jsx';
import { syncData } from '../reducers/noteReducer.js';

const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/data')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(syncData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [darkMode, setDarkMode] = useState('false');

  const darkModeButtonClick = () => {
    console.log('we are inside Dark mode button!');
    console.log('this is darkMode state:', darkMode);

    if (darkMode === 'false') {
      document.body.classList.toggle('dark-theme');
      document.body.style.backgroundColor = 'rgb(100, 110, 290)';
      setDarkMode('true');
    } else {
      document.body.classList.toggle('dark-theme');
      document.body.style.backgroundColor = null;
      setDarkMode('false');
    }
  };

  return (
    <div className='mainContainer'>
      <HeaderContainer darkModeButtonClick={darkModeButtonClick} />
      <JobContainer />
    </div>
  );
};

export default MainContainer;
