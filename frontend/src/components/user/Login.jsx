import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/userAction";
import PrimarySearchAppBar from '../common/SearchAppBar';

function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // redux store에 설정된 action에 대한 dispatch를 연결하는 훅
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body))
      .then((res) => {
        // console.log("login dispatch", res.payload.object);
        const obj = JSON.parse(res.payload.data);
        const status = JSON.parse(res.payload.status);
        console.log("login ojb", obj);
        console.log("login status", JSON.parse(res.payload.status));
        if (status) {
          alert("로그인 성공!");

          localStorage.setItem("loggedInfo", JSON.stringify(obj));
          console.log("히스토리")
          console.log(props.history)
          props.history.push({
            pathname: `/profile/${body.email}`,
            state: {email: body.email}
          });
        } else {
          alert("로그인 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="login">
      <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">회원 서비스 이용을 위해 로그인 해주세요.</p>
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
          {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            required
            placeholder="비밀번호"
          />
          <div className="userLink">
            {/* <Link to="/user/password" className="userLink"> */}
            비밀번호 찾기
            {/* </Link> */} |{" "}
            <Link to="/user/join" className="userLink">
              회원가입
            </Link>
          </div>
          <div className="btnContainer">
            <div>
              {Email && Password ? (
                <button className="userButton" type="submit">로그인하기</button>
              ) : (
                <div></div>
              )}
              {/* <button
                type="submit"
                className={Email && Password ? "successButton" : "failButton"}
              >
                로그인하기
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Login);
