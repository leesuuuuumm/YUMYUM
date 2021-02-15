import React, { useEffect, useState } from "react";
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import styled, { keyframes } from "styled-components";
import "./EurekaPage.css";
import { getPosition } from "../../_utils/getLocation";
import { firestore, geofire } from "../../_utils/firebase";
import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { distance } from "./distance";

const avatar = {
  0: q_yellow,
  1: q_brown,
  2: q_blue,
  3: q_purple,
  4: q_pink,
};
const ShoutPage = () => {
  const neighbor = [
    {
      nickname: "weekyear",
      avatar: 2,
      content: "배고팡!",
      createdAt: "2021년 2월 15일 오전 3시 13분 4초 UTC+9",

      position: {
        lng: 127.35065540000001,
        lat: 36.353231199999996,
      },
    },
    {
      nickname: "ahyeonway",
      avatar: 3,
      content: "JMT!",
      createdAt: "2021년 2월 15일 오전 3시 13분 4초 UTC+9",

      position: {
        lng: 127.35065540000001,
        lat: 36.353231199999996,
      },
    },
  ];
  const [waveVisible, setWaveVisible] = useState(false);
  const [didEureka, setDidEureka] = useState(false);
  const [waves, setWaves] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [myMessage, setMyMessage] = useState("유레카!");
  const [messages, setMessages] = useState(neighbor);
  const dispatch = useDispatch();

  const btnBg = {
    background: `url(${q_brown})`,
    backgroundSize: "3rem",
    backgroundColor: "white",
    borderRadius: "50%",
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
    width: 5rem;
    height: 5rem;
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

  useEffect(() => {
    console.log("message", messages);
    getPosition().then((res) => {
      // 나의 위치 UPDATE
      const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
      const data = {
        lat: res.Ma, //y
        lng: res.La, //x
        geohash: geofire.geohashForLocation([res.Ma, res.La]),
      };
      firestore.collection("users").doc(userEmail).update(data);
    });
  }, []);

  useEffect(() => {
    // 내 위치 주변의 message
    // Object.keys(neighbor).map((email) => {
    // let datas = [];
    // firestore
    //   .collection("users")
    //   .where(distance("position", { x: 37.45, y: 126.89 }), "<", 0.5)
    //   .onSnapshot(function (querySnapshot) {
    //     var datas = [];
    //     querySnapshot.forEach(function (doc) {
    //       datas.push(doc.data());
    //       console.log("띵동", datas);
    //     });
    //   });
  }, []);

  // btn click 시
  function clickShout() {
    setDidEureka(true);
    setWaveVisible(!waveVisible);
    setWaves((oldArray) => [...oldArray, <Circle />]);

    // 나의 message update
    const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;

    const data = {
      message: {
        content: myMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    };
    firestore.collection("users").doc(userEmail).update(data);
    setTimeout(function () {
      setDidEureka(false);
    }, 7000);
  }
  // 메세지 메뉴 토글
  function toggleMessageButton() {
    setIsOpen(!isOpen);
  }

  // 메세지 변경
  function clickMessage(e) {
    setIsOpen(false);
    setMyMessage(e.target.innerText);
  }

  return (
    <div className="shoutContainer">
      {didEureka &&
        messages &&
        messages.map((data, i) => {
          return (
            <div
              className="freinds"
              style={{
                left: `${10 + Math.floor(Math.random() * 80)}vw`,
                top: `${Math.floor(Math.random() * 70)}vh`,
              }}
            >
              <p>{data.content}</p>
              <img src={avatar[data.avatar]} alt={data.nickname}></img>
              <p>{data.nickname}</p>
            </div>
          );
        })}
      <div className="avatarWrapper">
        <div
          className="speech-bubble"
          style={{ background: "#f4d503", width: "4rem" }}
        >
          <p>{myMessage}</p>
        </div>
        <div className="avatarCircle">
          <button
            className="avatar"
            style={btnBg}
            onClick={clickShout}
          ></button>
          {waves}
        </div>
      </div>
      <div className="menuWrapper">
        <a className="navLink" id="closeLinks" onClick={toggleMessageButton}>
          메세지
        </a>
        <ul className={"circularNav " + (isOpen ? "showLinks" : "hideLinks")}>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">배고팡!</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">JMT!</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">맛없엉!</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">유레카!</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoutPage;
