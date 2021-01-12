import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

class Login extends Component {
  render() {
    const hasAccount = true;
    return (
      <section className="login">
        <div className="userContainer">
          <p className="userAppTitle">
            당신의
            <br />
            눈동자에 cheers...
          </p>
          <p className="userTitle">회원 서비스 이용을 위해 로그인 해주세요.</p>
          <input type="text" autoFocus required placeholder="이메일" />
          {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}
          <input type="password" required placeholder="비밀번호" />
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
                <button>로그인하기</button>
              </div>
            ) : (
              <div>
                <button>Login Gray</button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
