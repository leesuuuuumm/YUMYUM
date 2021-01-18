import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/userAction";
import { Link, withRouter } from "react-router-dom";
import { chkEmail, chkPassword } from "../../utils/validator";

function SignUp(props) {
  // useState로 현재 state와 state를 변경하는 함수 지정
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkPwdError, setCheckPwdError] = useState(false);

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
        email: Email,
        nickname: Nickname,
        password: Password,
      };
      dispatch(registerUser(body))
        .then((res) => {
          if (res.payload.status) {
            alert("회원가입 성공!");
            props.history.push("/user/complete");
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
    <section className="login">
      <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">
          회원 서비스 이용을 위해 회원가입을 해주세요.
        </p>
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
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            autoFocus
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

          <div className="userLink">
            <Link to="/" className="userLink">
              이미 계정이 있으신가요?
            </Link>
          </div>
          <div className="btnContainer">
            {Email && Password && ConfirmPassword && Nickname ? (
              <div>
                <button className="userButton" type="submit">회원가입하기</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(SignUp);
