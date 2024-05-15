import React from 'react';
import './StyleNavbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14V4a6 6 0 100 12zM5.293 6.707a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414zM13 12.414V14a1 1 0 01-2 0v-1.586l-.707-.707a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 10-1.414-1.414L13 12.414z"
              clipRule="evenodd"
            />
          <span className="title"><Link to='/'>Quizify</Link></span>
        </div>
        <div>
          <Link to="/ques-mod" className="questions">Questions</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

