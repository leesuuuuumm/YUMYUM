import React, { useState } from "react";
import girl from "../../assets/barkIcon/girl.svg";
import styled, { keyframes, css } from "styled-components";

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
  };

  const shout = keyframes`
  0% {
    transform: scale(1)
  }
  100% {
    transform: scale(8)
  }
`;
  const Circle = styled.label`
    width: 4rem;
    height: 4rem;
    left: 50%;
    top: 50%;
    position: absolute;
    border-radius: 50px;
    border: 1px solid #f4d503;
    transform: ${center};
    animation: ${shout} 3s;
  `;

  // btn click 시
  function clickBark() {
    setWaveVisible(!waveVisible);
    console.log("hi");
    setWaves((oldArray) => [...oldArray, 1]);
  }

  return (
    <div className="barkContainer">
      <div style={circle}>
        <button style={btnBg} onClick={clickBark}></button>
      </div>
      {waves.map((wave) => (
        <Circle />
      ))}
      {/* {waveVisible ? <Circle /> : <div></div>} */}
    </div>
  );
};

export default BarkPage;
