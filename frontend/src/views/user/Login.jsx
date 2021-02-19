import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Quokka from "../../_assets/quokka.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/userAction";
import "./CSS/Login.css";
import { getPosition } from "../../_utils/getLocation";
import { firestore, geofire } from "../../_utils/firebase";
import firebase from "firebase/app";
import Overlay from "react-overlay-component";
import Howto from "../../_components/common/Howto";

function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isOpen, setOverlay] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  // redux store에 설정된 action에 대한 dispatch를 연결하는 훅
  const dispatch = useDispatch();
  
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const closeOverlay = () => setOverlay(false);

  const configs = {
      animate: true,
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body))
      .then((res) => {
        const obj = JSON.parse(res.payload.data);
        const status = JSON.parse(res.payload.status);
        if (status === 200) {
          localStorage.setItem("jwt-token", obj.token);
          localStorage.setItem("loggedInfo", JSON.stringify(obj.user));

          // 위치 업데이트
          getPosition().then((res) => {
            // 나의 위치 UPDATE
            const userEmail = obj.user.email;
            const nickname = obj.user.nickname;
            let lat = 0
            let lng = 0
            if (res) {
              lat = res.Ma
              lng = res.La
            }
            const data = {
              nickname: nickname,
              avatar: obj.user.avatar,
              lat: lat, //y
              lng: lng, //x
              geohash: geofire.geohashForLocation([lat, lng]).substring(0, 5),
            };
            firestore.collection("users").doc(userEmail).update(data);
            firestore.collection("users").doc(userEmail).update({
              message: firebase.firestore.FieldValue.delete(),
            });
          });

          props.history.push({
            pathname: "/feed/flippages",
            state: { value: "feed/flippages" },
          });
        } else {
          // alert("로그인 실패");
          setIsLogin(true);
        }
      })
      .catch((err) => {
        setIsLogin(true);
      });
  };
  return (
    <section className="login">
      <div className="loginContainer">
        <div className="img_wrap" onClick={() => {setOverlay(true);}}>
          <img className="userLogo" src={Quokka} alt="쿼카" />
          <div className="loginAppTitle">YUM YUM</div>
        </div>
        <Overlay id="howto" configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
          <h2>YUM? YUM! 사용설명서</h2>
          <hr/>
          <Howto />

        </Overlay>
        <p className="loginTitle">회원 서비스 이용을 위해 로그인 해주세요.</p>
        <div className="login_input_wrap">
          <div className="email_label">EMAIL</div>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={Email}
              onChange={onEmailHandler}
              autoFocus
              required
              autoCapitalize="off"
              placeholder="이메일"
            />
            <hr className="login_hr" />
            <div className="password_label">PASSWORD</div>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              required
              placeholder="비밀번호"
            />
            <hr className="login_hr" />
            <div className="userLink">
              <Link to="/user/join" className="userLink">
                회원가입
              </Link>
            </div>
            <div className="btnContainer">
              <div>
                {islogin && (
                  <div className="login_error">
                    이메일 혹은 비밀번호가 잘못되었습니다.
                  </div>
                )}
                <button className="loginButton" type="submit">
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Login);
