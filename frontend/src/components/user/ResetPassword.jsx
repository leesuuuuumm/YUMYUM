import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

class ResetPassword extends Component {
  render() {
    return (
      <section className="login">
        <div className="userContainer">
          <p className="userAppTitle">
            당신의
            <br />
            눈동자에 cheers...
          </p>
          <p className="userTitle">비밀번호 찾기</p>
          <input type="text" autoFocus required placeholder="이름" />
          <input type="text" autoFocus required placeholder="이메일" />
          <div className="userLink">
            <Link to="/" className="userLink">
              로그인
            </Link>{" "}
            |{" "}
            <Link to="/user/join" className="userLink">
              회원가입
            </Link>
          </div>

          <div className="btnContainer">
            <button>비밀번호 찾기</button>
          </div>
        </div>
      </section>
    );
  }
}

export default ResetPassword;
