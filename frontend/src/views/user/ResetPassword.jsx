import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../_actions/userAction";
import { withRouter } from "react-router-dom";

function ResetPassword(props) {
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkPwdError, setCheckPwdError] = useState(false);

  // redux store에 설정된 action에 대한 dispatch를 연결하는 훅
  const dispatch = useDispatch();

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onNewPasswordHandler = (e) => {
    setNewPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
    if (e.currentTarget.value === NewPassword) {
      setCheckPwdError(false);
    } else {
      setCheckPwdError(true);
    }
  };

  // 중요!!!
  // 함수형 컴포넌트에서 componentDidMount와 같은 함수
  useEffect(() => {
    const loggedInfo = localStorage.getItem("loggedInfo");

    if (loggedInfo) {
      setEmail(JSON.parse(loggedInfo).email);
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (NewPassword === ConfirmPassword) {
      console.log(localStorage.getItem("loggedInfo").email);
      let body = {
        email: email,
        password: Password,
        newPassword: NewPassword,
      };
      dispatch(resetPassword(body))
        .then((res) => {
          console.log(res);
          if (res.payload) {
            alert("변경 성공!");
            props.history.go(-1);
          } else {
            alert("변경 실패");
          }
        })
        .catch((err) => {
          console.log("변경 실패 에러");
          console.log(err);
        });
    } else {
      alert("비밀번호 노일치!!");
    }
  };

  return (
    <section className="login">
      <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">비밀번호 변경하기</p>
        <form onSubmit={onSubmitHandler}>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            required
            placeholder="비밀번호"
          />
          <input
            type="password"
            value={NewPassword}
            onChange={onNewPasswordHandler}
            required
            placeholder="새로운 비밀번호"
          />
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            required
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          {checkPwdError ? (
            <div>
              <p className="errorMsg">비밀번호가 일치하지 않습니다</p>
            </div>
          ) : (
            <div></div>
          )}
          {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}

          <div className="btnContainer">
            <button type="submit">비밀번호 변경하기</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(ResetPassword);
