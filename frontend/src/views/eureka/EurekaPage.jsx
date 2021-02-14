import React, { useEffect, useState } from "react";
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import styled, { keyframes } from "styled-components";
import "./EurekaPage.css";
import { getPosition } from "../../_utils/getLocation";
import { firestore } from "../../_utils/firebase";
import firebase from "firebase/app";
import { useDispatch } from "react-redux";

const ShoutPage = () => {
  const [waveVisible, setWaveVisible] = useState(false);
  const [waves, setWaves] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [myMessage, setMyMessage] = useState("Eureka");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const btnBg = {
    background: `url(${q_brown})`,
    backgroundSize: "3rem",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    margin: "auto",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    height: "3rem",
    width: "3rem",
    border: 0,
    outline: 0,
    zIndex: 10,
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

  useEffect(() => {
    getPosition().then((res) => {
      console.log("pos", res);
      // 나의 위치 UPDATE
      const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
      const data = {
        position: {
          y: res.Ma,
          x: res.La,
        },
      };
      firestore.collection("users").doc(userEmail).update(data);
    });
  }, []);

  useEffect(() => {
    // 위치 기반 유저 dummy data
    const neighbor = {
      "www@www.www": "potatoSoup",
      "qqq@qqq.qqq": "ashoil",
      "ssafy@ssafy.com": "ssafy",
      "yeom@yeom.yeom": "yeomyeom",
      "weekyear@naver.com": "weekyear",
      "ahyeon@ssafy.com": "ahyeonway",
    };
    // 내 위치 주변의 message
    Object.keys(neighbor).map((email) => {
      let datas = [];
      firestore
        .collection("users")
        .where("nickname", "==", neighbor[email])
        .onSnapshot(function (querySnapshot) {
          var cities = [];
          querySnapshot.forEach(function (doc) {
            // console.log(doc.data());
            cities.push(doc.data());
          });
          console.log("안", cities);
          datas = [...cities];
          // setMessages([...cities]);
          console.log("안 datas", datas);
          console.log("안 messages", messages);
        });
      console.log("밖 datas", datas);
    });
  }, []);

  // btn click 시
  function clickShout() {
    setWaveVisible(!waveVisible);
    setWaves((oldArray) => [...oldArray, <Circle />]);

    // 나의 message update
    const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;

    const data = {
      message: {
        content: "hi",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    };
    firestore.collection("users").doc(userEmail).update(data);
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
      {/* {messages}
      <ul>
        {messages &&
          messages.map((data) => {
            if (data) {
              <li key={data.id}>{data.nickname}</li>;
            }
          })}
      </ul> */}
      <div className="avatarWrapper">
        <div className="speech-bubble">
          <p>{myMessage}</p>
        </div>
        <div className="avatarCircle">
          <button style={btnBg} onClick={clickShout}></button>
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
              <i className="fa">배고파</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">JMT</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">노맛</i>
            </a>
          </li>
          <li onClick={clickMessage}>
            <a>
              <i className="fa">Eureka</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoutPage;
