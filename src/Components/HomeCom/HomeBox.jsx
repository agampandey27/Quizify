import React from "react";
import Navbar from "./Navbar";
import StartButton from "./StartButton";
import { Container } from "@mui/material";
import Statement from "./Statement";
import './StyleHomeBox.css';

function HomeBox() {
  return (
    <div>
      <Container>
        <Navbar />
        <div className="content">
          <Statement />
          <div className="StartButton">
          <StartButton /></div>
        </div>
      </Container>
    </div>
  );
}

export default HomeBox;
