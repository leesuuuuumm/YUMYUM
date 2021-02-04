import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Quokka from "../../_assets/quokka1.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/userAction";
import "./CSS/Login.css";

function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [islogin, setIsLogin] = useState(false);
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
        if (status == 200) {
          // alert("로그인 성공!");

          localStorage.setItem("loggedInfo", JSON.stringify(obj));
          console.log("히스토리");
          console.log(props.history);
          props.history.push({
            pathname: '/feed/flippages',
            state: { value: "feed/flippages" },
          });
        } else {
          // alert("로그인 실패");
          setIsLogin(true)
        }
      })
      .catch((err) => {
        setIsLogin(true);
      });
  };
  return (
    <section className="login">
      <div className="loginContainer">
        <div className="img_wrap">
          <img src={Quokka} alt="쿼카" />
          <div className="loginAppTitle">YUM YUM</div>
        </div>
        <p className="loginTitle">회원 서비스 이용을 위해 로그인 해주세요.</p>
        <div className="input_wrap">
          <div className="email_label">EMAIL</div>
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
            <hr className="login_hr" />
            <div className="password_label">PASSWORD</div>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              required
              placeholder="비밀번호"
            />
            <hr className="login_hr" />
            <div className="userLink">
              <Link to="/user/join" className="userLink">
                회원가입
              </Link>
            </div>
            <div className="btnContainer">
              <div>
                {islogin && (
                  <div className="login_error">
                    이메일 혹은 비밀번호가 잘못되었습니다.
                  </div>
                )}
                <button className="loginButton" type="submit">
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Login);
