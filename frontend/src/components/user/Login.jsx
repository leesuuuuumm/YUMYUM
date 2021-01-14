import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/userAction";

function Login(props) {
  const hasAccount = true;
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
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
        console.log(res);
        if (res.payload.loginSuccess) {
          console.log("hihi");
        } else {
          alert(res.payload.message);
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
            <Link to="/user/resetpassword" className="userLink">
              비밀번호 찾기
            </Link>{" "}
            |{" "}
            <Link to="/user/join" className="userLink">
              회원가입
            </Link>
          </div>
          <div className="btnContainer">
            {hasAccount ? (
              <div>
                <button type="submit">로그인하기</button>
              </div>
            ) : (
              <div>
                <button>Login Gray</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Login);
