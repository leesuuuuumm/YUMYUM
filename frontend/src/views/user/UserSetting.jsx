import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser, updateUser } from "../../_actions/userAction";
import './CSS/UserSetting.css';

function UserSetting(props) {
  const [nickname, setNickName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  //TODO 닉네임이랑, 한줄내용을 서버에  보내주는 로직을 작성해야한다.
  useEffect(() => {
    const loggedInfo = JSON.parse(localStorage.getItem("loggedInfo"));
    const emailInfo = loggedInfo.email;
    dispatch(getUser(emailInfo)).then((res) => {
      const userInfo = JSON.parse(res.payload.data);
      setNickName(userInfo.nickname);
      setEmail(userInfo.email);
      if (userInfo.introduction === undefined) {
        setIntroduction("");
      } else {
        setIntroduction(userInfo.introduction);
      }
    });
  }, []);

  const onNicknameHandler = (e) => {
    setNickName(e.target.value);
  };

  const onIntroductionHandler = (e) => {
    setIntroduction(e.target.value);
  };

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    const config = {
      email: email,
      nickname: nickname,
      introduction: introduction,
    };
    dispatch(updateUser(config))
      .then((res) => {
        if (res.payload) {
          console.log(res.payload);
          alert("유저정보가 변경되었습니다.");
          // props.history.go(-1);
          props.history.go(-1);
        } else {
          alert("변경 실패");
        }
      })
      .catch((err) => {
        console.log("변경 실패");
        console.log(err);
      });
  };

  return (
    <section className="setting">
      <div className="settingContainer">
        <p className="settingAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="settingTitle">유저 정보 변경</p>
        <div className="input_wrap">
          <form onSubmit={onSubmitHandeler}>
            <input
              type="text"
              value={nickname}
              onChange={onNicknameHandler}
              required
              placeholder="닉네임변경하기"
            />
            <input
              type="text"
              value={introduction}
              onChange={onIntroductionHandler}
              required
              placeholder="한줄 소개를 써주세요."
            />
            <div className="btnContainer">
              <button className="settingButton" type="submit">
                유저정보 변경하기
              </button>
            </div>
          </form>
          </div>
      </div>
    </section>
  );
}

export default withRouter(UserSetting);
