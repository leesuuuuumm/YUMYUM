import React, { useEffect, useState, useLayoutEffect } from "react";
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import "./EurekaPage.css";
import { getPosition } from "../../_utils/getLocation";
import { firestore, geofire } from "../../_utils/firebase";
import firebase from "firebase/app";

const avatar = {
  0: q_brown,
  1: q_yellow,
  2: q_pink,
  3: q_blue,
  4: q_purple,
};

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 2);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const ShoutPage = () => {
  const [waveVisible, setWaveVisible] = useState(false);
  const [didEureka, setDidEureka] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [myMessage, setMyMessage] = useState("유레카!");
  const [messages, setMessages] = useState([]);
  const [myNeighbor, setMyNeighbor] = useState([]);
  const [myPos, setMyPos] = useState("");

  const avatarId = JSON.parse(localStorage.getItem("loggedInfo")).avatar;
  const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
  const userNickname = JSON.parse(localStorage.getItem("loggedInfo")).nickname;

  // ripple 없애기
  useDebouncedRippleCleanUp(ripples.length, 1000, () => {
    setRipples([]);
  });

  // 실시간 메세지 update
  useEffect(() => {
    // 나의 위치 UPDATE
    getPosition().then((res) => {
      const pos = geofire.geohashForLocation([res.Ma, res.La]).substring(0, 4);
      const data = {
        lat: res.Ma, //y
        lng: res.La, //x
        geohash: pos,
      };
      firestore.collection("users").doc(userEmail).update(data);

      setMyPos(pos);

      // 메세지 snapshot
      firestore
        .collection("users")
        .where("geohash", "==", pos)
        .onSnapshot(function (querySnapshot) {
          var datas = [];
          querySnapshot.forEach(function (doc) {
            const data = doc.data();
            if (data.nickname !== userNickname && data.message) {
              datas.push(doc.data());
            }
          });
          setMessages(datas);
        });
      console.log("띵동 message", messages);
    });
  }, []);

  // button 클릭 시 ripple 생성
  function showRipple(e) {
    setRipples((oldArray) => [...oldArray, <span></span>]);
    setDidEureka(true);
    setWaveVisible(!waveVisible);

    // 나의 message update
    const data = {
      message: {
        content: myMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    };
    firestore.collection("users").doc(userEmail).update(data);

    // 3초뒤 삭제
    setTimeout(function () {
      var userRef = firestore.collection("users").doc(userEmail);
      var removeMessage = userRef.update({
        message: firebase.firestore.FieldValue.delete(),
      });
    }, 5000);

    // 이웃 update
    firestore
      .collection("users")
      .where("geohash", "==", myPos)
      .get()
      .then(function (querySnapshot) {
        var datas = [];
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          if (data.nickname !== userNickname) {
            datas.push(doc.data());
          }
        });
        setMyNeighbor(datas);
        console.log("neighbor => ", myNeighbor);
      });

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
      {messages &&
        messages.map((data, i) => {
          return (
            <div
              className="freinds"
              style={{
                left: `${10 + Math.floor(Math.random() * 80)}vw`,
                top: `${Math.floor(Math.random() * 70)}vh`,
              }}
            >
              <p>{data.message.content}</p>
              <img src={avatar[data.avatar]} alt={data.nickname}></img>
              <p>{data.nickname}</p>
            </div>
          );
        })}

      {didEureka &&
        myNeighbor &&
        myNeighbor.map((data, i) => {
          return (
            <div
              className="freinds"
              style={{
                left: `${10 + Math.floor(Math.random() * 80)}vw`,
                top: `${Math.floor(Math.random() * 70)}vh`,
              }}
            >
              {data.message && <p>{data.message.content}</p>}

              <img src={avatar[data.avatar]} alt={data.nickname}></img>
              <p>{data.nickname}</p>
            </div>
          );
        })}
      {/* 나의 아바타 */}
      <div className="avatarWrapper">
        <div
          className="speech-bubble"
          style={{ background: "#f4d503", width: "4rem" }}
        >
          <p>{myMessage}</p>
        </div>
        <div className="avatarCircle">
          {/* 유레카 버튼 */}
          <button
            className="avatar"
            style={{
              background: `url(${avatar[avatarId]})`,
              backgroundSize: "100%",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
            // onClick={clickShout}
            // 누를때
            onMouseDown={showRipple}
            // 뗄때
            // onMouseUp={debounce(cleanUp, 2000)}
          ></button>
          {/* ripple */}
          <div className="ripple-container">{ripples}</div>
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
