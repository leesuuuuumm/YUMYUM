import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../_actions/userAction";
import { withRouter } from "react-router-dom";
import './CSS/ResetPassword.css'
import { getEmail } from "../../_utils/setToken"
import CloseIcon from '@material-ui/icons/Close';

function ResetPassword(props) {
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkPwdError, setCheckPwdError] = useState(false);
  
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

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      setEmail(getEmail());
    }
  }, []);

  const goback = () => {
    props.history.go(-1)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (NewPassword === ConfirmPassword) {
      let body = {
        userEmail: getEmail(),
        password: Password,
        newPassword: NewPassword,
      };
      dispatch(resetPassword(body))
        .then((res) => {
          if (res.payload) {
            alert("변경 성공!");
            props.history.go(-1);
          } else {
            alert("변경 실패");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("비밀번호 노일치!!");
    }
  };

  return (
    <section className="resetPw">
      <div className="resetPwContainer">
        <p className="resetPwTitle">비밀번호 변경하기</p>
        <div className="input_wrap">
          <form onSubmit={onSubmitHandler}>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              required
              placeholder="현재 비밀번호"
            />
            <hr className="restPw" />
            <input
              type="password"
              value={NewPassword}
              onChange={onNewPasswordHandler}
              required
              placeholder="새로운 비밀번호"
            />
            <hr className="restPw" />
            <input
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              required
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <hr className="restPw" />
            {checkPwdError ? (
              <div>
                <p className="errorMsg">비밀번호가 일치하지 않습니다</p>
              </div>
            ) : (
              <div></div>
            )}
            {/* <p className="errorMsg">이메일 형식을 확인하세요</p> */}

            <div className="btnContainer">
              <button className="resetPwButton"type="submit">비밀번호 변경하기</button>
            </div>
          </form>
        </div>
      </div>
      <CloseIcon className="goback" fontSize="large" onClick={()=>goback()} />
    </section>
  );
}

export default withRouter(ResetPassword);
