import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          navigate("/times-up");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, navigate]);

  return <div>{timeLeft}</div>;
};

export default Timer;