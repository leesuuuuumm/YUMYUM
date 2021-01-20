import React from "react";
import { Link, withRouter } from "react-router-dom";

function SignUpComplete(props) {
  return (
    <section className="login">
      <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">회원 가입이 완료됐습니다!</p>
        <div className="btnContainer">
          <button className="userButton" type="submit">이메일 인증하기</button>
          <button className="userButton" type="submit">메일 재발송</button>
        </div>
        <div className="userLink">
          <Link to="/" className="userLink">
            로그인하러가기
          </Link>
        </div>
      </div>
    </section>
  );
}

export default withRouter(SignUpComplete);
