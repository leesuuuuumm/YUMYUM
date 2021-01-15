import { Link } from "react-router-dom";

import React, { Component } from "react";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { nickname: "" };
  }

  componentDidMount() {
    const loggedInfo = JSON.parse(localStorage.getItem("loggedInfo"));
    this.setState({ nickname: loggedInfo.nickname });
  }
  render() {
    return (
      <section className="login">
        <div className="userContainer">
          <h2 className="userAppTitle">Hello, {this.state.nickname}</h2>

          <Link to="/user/resetpassword" className="userLink">
            비밀번호 바꾸기
          </Link>

          <button>로그아웃</button>
        </div>
      </section>
    );
  }
}

export default MainPage;
