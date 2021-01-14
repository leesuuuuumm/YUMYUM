import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/userAction";
import { Link, withRouter } from "react-router-dom";

function SignUp(props) {
  // useState로 현재 state와 state를 변경하는 함수 지정
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  // redux store에 설정된 action에 대한 dispatch를 연결하는 훅
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
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
          console.log(res);
          if (res.payload) {
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
            placeholder="닉네임"
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
          {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            required
            placeholder="비밀번호"
          />
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            required
            placeholder="비밀번호확인"
          />
          <div className="userLink">
            <Link to="/" className="userLink">
              이미 계정이 있으신가요?
            </Link>
          </div>
          <div className="btnContainer">
            <button type="submit">회원가입하기</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(SignUp);
