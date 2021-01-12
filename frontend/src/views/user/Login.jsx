import React, { Component } from "react";
// import PropTypes from "prop-types";

class Login extends Component {
  render() {
    return (
      <div>
        당신의 눈동자에 건배...
        <div>
          <input type="text" placeholder="이메일을 입력하세요" />
        </div>
        <div>
          <input type="text" placeholder="비밀번호를 입력하세요" />
        </div>
      </div>
    );
  }
}

// Login.propTypes = {};

export default Login;
