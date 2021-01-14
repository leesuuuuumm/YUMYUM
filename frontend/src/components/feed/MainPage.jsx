import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function MainPage(props) {
  const onClickHandler = () => {};

  return (
    <div>
      <h2>메인 페이지</h2>
      <Link to="/user/resetpassword" className="userLink">
        비밀번호 바꾸기
      </Link>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(MainPage);
