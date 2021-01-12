import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

class SignUp extends Component {
  render() {
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
          <input type="text" autoFocus required placeholder="이메일" />
          {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}
          <input type="password" required placeholder="비밀번호" />
          <input type="password" required placeholder="비밀번호확인" />
          <div className="userLink">
            <Link to="/" className="userLink">
              이미 계정이 있으신가요?
            </Link>
          </div>
          <div className="btnContainer">
            <button>회원가입하기</button>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
