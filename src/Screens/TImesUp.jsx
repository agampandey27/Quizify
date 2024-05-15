import React from 'react';
import './StyleTimesUp.css'; 
import { Link } from 'react-router-dom';
import { useGlobal } from '../Components/Global/GlobalVariable'

function TimesUp() {
    var { num, setNum } = useGlobal();

    const numZero = () =>{
        setNum(num = 0);
      }
  return (
    <div className="TimesUpContainer">
      <p className="TimesUpMessage">Looks like your time has Ended !</p>
      <button className="TimesUpButton" onClick={numZero}><Link to='/quiz'>Try Again</Link></button>
      <button className="TimesUpButton" onClick={numZero}><Link to='/'>Go Home</Link></button>
    </div>
  );
}

export default TimesUp;
