import React, { useState, useEffect } from 'react';
import './StyleHome.css';
import HomeBox from '../Components/HomeCom/HomeBox';

function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMainContent(true);
    }, 2000);
  }, []);

  return (
    <div>
    <div className="home-container">
      {showMainContent ? (
        <div className="main-content">
          <HomeBox />
        </div>
      ) : (
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome To Quizify</h1>
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;