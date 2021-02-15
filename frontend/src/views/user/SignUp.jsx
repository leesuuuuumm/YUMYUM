import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/userAction";
import { Link, withRouter } from "react-router-dom";
import { chkEmail, chkPassword } from "../../_utils/validator";
import Quokka from "../../_assets/quokka1.png";
import "./CSS/SignUp.css";
import SelectAvatar from "../../_components/icon/SelectAvatar";
import { firestore, geofire } from "../../_utils/firebase";
import { getPosition } from "../../_utils/getLocation";

function SignUp(props) {
  // useState로 현재 state와 state를 변경하는 함수 지정
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkPwdError, setCheckPwdError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarId, setAvartarId] = useState("");
  // redux store에 설정된 action에 대한 dispatch를 연결하는 훅
  const dispatch = useDispatch();
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    //validator에 정의한 chkEmail로 이메일 검사
    // false라면 error를 true로 바꿈
    if (!chkEmail(e.currentTarget.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
    if (!chkPassword(e.currentTarget.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
    if (e.currentTarget.value === Password) {
      setCheckPwdError(false);
    } else {
      setCheckPwdError(true);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password === ConfirmPassword) {
      let body = {
        avatar: avatarId,
        email: Email,
        nickname: Nickname,
        password: Password,
      };

      dispatch(registerUser(body))
        .then((res) => {
          if (res.payload.status === "200") {
            // firebase
            getPosition().then((res) => {
              // 나의 위치 UPDATE
              const data = {
                nickname: Nickname,
                avatar: avatarId,
                lat: res.Ma, //y
                lng: res.La, //x
                geohash: geofire.geohashForLocation([res.Ma, res.La]),
                message: {
                  content: "",
                  createdAt: "",
                },
              };
              firestore.collection("users").doc(Email).set(data);
            });

            props.history.push("/");
          } else if (res.payload.status === "400") {
            if (res.payload.message === "this email already exists") {
              setErrorMessage("이미 가입되어 있는 이메일입니다.");
            } else {
              setErrorMessage("닉네임이 중복되었습니다.");
            }
          } else {
            alert("회원가입 실패");
          }
        })
        .catch((err) => {
          console.log("회원가입 실패 에러");
          console.log(err);
        });
    } else {
      alert("비밀번호 노일치!!");
    }
  };

  return (
    <div className="signUp">
      <div className="signUpContainer">
        <div className="img_wrap">
          <img className="userLogo" src={Quokka} alt="쿼카" />
          <div className="signUpAppTitle">YUM YUM</div>
        </div>
        <p className="signUpTitle">
          회원 서비스 이용을 위해 회원가입을 해주세요.
        </p>
        <div className="input_wrap">
          <SelectAvatar setAvartarId={setAvartarId}></SelectAvatar>
          <form onSubmit={onSubmitHandler}>
            <input
              type="nickname"
              value={Nickname}
              onChange={onNicknameHandler}
              autoFocus
              required
              autoCapitalize="off"
              placeholder="닉네임(8글자 이하)"
            />
            <hr className="signUp_hr" />
            <input
              type="email"
              value={Email}
              onChange={onEmailHandler}
              required
              autoCapitalize="off"
              placeholder="이메일"
            />
            {emailError ? (
              <div>
                <p className="errorMsg">이메일이 올바르지 않습니다.</p>
              </div>
            ) : (
              <div></div>
            )}
            <hr className="signUp_hr" />
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              required
              placeholder="비밀번호"
            />
            {passwordError ? (
              <div>
                <p className="errorMsg">8 ~ 10자 영문, 숫자 조합</p>
              </div>
            ) : (
              <div></div>
            )}
            <hr className="signUp_hr" />
            <input
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              required
              placeholder="비밀번호확인"
            />
            {checkPwdError ? (
              <div>
                <p className="errorMsg">비밀번호가 일치하지 않습니다</p>
              </div>
            ) : (
              <div></div>
            )}
            <hr className="signUp_hr" />
            <div className="signUpLink">
              <Link to="/" className="signUpLink">
                이미 계정이 있으신가요?
              </Link>
            </div>
            {errorMessage && (
              <div className="errorMsgSignUp">{errorMessage}</div>
            )}
            <div className="btnContainer">
              <div>
                <button className="signUpButton" type="submit">
                  회원가입하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
