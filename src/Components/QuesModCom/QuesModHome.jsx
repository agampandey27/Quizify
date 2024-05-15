import React from "react";
import Button from "@mui/material/Button";
import "./StyleButton.css";
import { Link } from "react-router-dom";

function QuesModHome() {
  const buttonStyle = {
    background: "#36D7B7",
    borderRadius: 10,
    border: 0,
    color: "#212121",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };

  return (
    <>
    <div className="btncontainer">
      <Button variant="contained" style={buttonStyle} size="large">
        <div className="button"><Link to='/ques-create'>Create Question</Link></div>
      </Button>
      <Button variant="contained" style={buttonStyle} size="large">
        <div className="button"><Link to='/ques-read'>All Question</Link></div>
      </Button>
    </div>
    </>
  );
}

export default QuesModHome;
