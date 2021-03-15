import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../_actions/userAction";
import SelectAvatar from "../../_components/icon/SelectAvatar";
import "./CSS/UserSetting.css";
import { firestore } from "../../_utils/firebase";
import { getEmail } from "../../_utils/setToken";
import CloseIcon from '@material-ui/icons/Close';

function UserSetting(props) {
  const [nickname, setNickName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [email, setEmail] = useState("");
  const [avatarId, setAvartarId] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  //TODO 닉네임이랑, 한줄내용을 서버에  보내주는 로직을 작성해야한다.
  useEffect(() => {
    // const loggedInfo = localStorage.getItem("loggedInfo");
    const email = getEmail();
    dispatch(getUser(email)).then((res) => {
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

  useEffect(() => {
    setAvartarId(location.state.avatarId);
  }, []);

  const onNicknameHandler = (e) => {
    setNickName(e.target.value);
  };

  const onIntroductionHandler = (e) => {
    setIntroduction(e.target.value);
  };

  const goback = () => {
    props.history.go(-1)
  }

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    const config = {
      avatar: avatarId,
      email: email,
      nickname: nickname,
      introduction: introduction,
    };
    dispatch(updateUser(config))
      .then((res) => {
        if (res.payload) {
          const obj = JSON.parse(res.payload.data);
          const status = JSON.parse(res.payload.status);
          if (status == 200) {
            localStorage.setItem("loggedInfo", JSON.stringify(obj));
            // 나의 정보 UPDATE
            const userEmail = obj.email;
            const nickname = obj.nickname;
            const data = {
              nickname: nickname,
              avatar: avatarId,
            };
            firestore.collection("users").doc(userEmail).update(data);

            props.history.go(-1);
          }
        } else {
          alert("변경 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="setting">
      <div className="settingContainer">
        <p className="settingTitle">유저 정보 변경</p>
        <div className="input_wrap">
          <SelectAvatar
            setAvartarId={setAvartarId}
            avatarInfo={avatarId}
          ></SelectAvatar>
          <form onSubmit={onSubmitHandeler}>
            <input
              type="text"
              value={nickname}
              onChange={onNicknameHandler}
              required
              placeholder="닉네임변경하기"
            />
            <hr className="setting_hr" />
            <input
              type="text"
              value={introduction}
              onChange={onIntroductionHandler}
              required
              placeholder="한줄 소개를 써주세요."
            />
            <hr className="setting_hr" />
            <div className="btnContainer">
              <button className="settingButton" type="submit">
                유저정보 변경하기
              </button>
            </div>
          </form>
        </div>
      </div>
      <CloseIcon className="goback" fontSize="large" onClick={()=>goback()} />
    </section>
  );
}

export default withRouter(UserSetting);
