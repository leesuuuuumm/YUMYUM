import React, { useState } from "react";
import girl from "../../_assets/barkIcon/girl.svg";
import styled, { keyframes, css } from "styled-components";
import "./BarkPage.css";

const BarkPage = () => {
  const [waveVisible, setWaveVisible] = useState(false);
  const [waves, setWaves] = useState([]);
  //css
  const center = "translate(-" + 50 + "%, -" + 50 + "%)";
  const btnBg = {
    background: `url(${girl})`,
    backgroundSize: "3rem",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: center,
    height: "3rem",
    width: "3rem",
    border: 0,
    outline: 0,
    zIndex: 10,
  };
  const circle = {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: center,
    border: 4 + "px solid #F4D503",
    zIndex: 8,
  };

  const shout = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(8);
    opacity: 0.3;
  }
`;
  const Circle = styled.div`
    width: 4rem;
    height: 4rem;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    border-radius: 50%;
    background-color: #f4d503;
    opacity: 0;
    animation: ${shout} 3s;
    z-index: 1;
  `;

  // btn click 시
  function clickBark() {
    setWaveVisible(!waveVisible);
    console.log("hi");
    setWaves((oldArray) => [...oldArray, <Circle />]);
  }

  return (
    <div className="barkContainer">
      <div style={circle}>
        <button style={btnBg} onClick={clickBark}></button>
        {waves}
      </div>
    </div>
  );
};

export default BarkPage;
