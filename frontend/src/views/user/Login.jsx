import React, { Component } from "react";
// import PropTypes from "prop-types";

class Login extends Component {
  render() {
    const hasAccount = true;
    return (
      <section className="login">
        <div className="loginContainer">
          <h1>당신의 눈동자에 cheers...☆</h1>

          <label>Username</label>
          <input
            type="text"
            autoFocus
            required
            placeholder="이메일을 입력하세요"
          />
          <p className="errorMsg">이메일 형식을 확인하세요</p>

          <label>Password</label>
          <input type="password" required placeholder="비밀번호를 입력하세요" />

          <div className="btnContainer">
            {hasAccount ? (
              <div>
                <button>Login</button>
              </div>
            ) : (
              <div>
                <button>Login Gray</button>
              </div>
            )}
          </div>
          <p>혹시 비밀번호를 잊으셨나요?</p>
        </div>
      </section>
    );
  }
}

export default Login;
