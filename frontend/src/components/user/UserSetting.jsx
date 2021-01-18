import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';

function UserSetting(props) {
  const [nickname, setNickName] = useState("");
  const [profileContent, setProfileContent] = useState("");

  //TODO 닉네임이랑, 한줄내용을 서버에  보내주는 로직을 작성해야한다.
  useEffect(() =>{
    const loggedInfo = localStorage.getItem("loggedInfo");
    
    if (loggedInfo) {
      setNickName(JSON.parse(loggedInfo).nickname)
    }
  },[]);

  const onNicknameHandler = (e) => {
    setNickName(e.target.value);
  }

  const onProfileContentHandler = (e) => {
    setProfileContent(e.target.value)
  }

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    alert('유저정보가 변경되었습니다.');
    
  }

  return (
    <section className='login'>
    <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">유저 정보 변경</p>
        <form onSubmit={onSubmitHandeler}>
          <input 
            type="text"
            value = {nickname}
            onChange = {onNicknameHandler}
            required
            placeholder="닉네임변경하기"
          />
          <input
            type="text"
            onChange = {onProfileContentHandler}
            value = {profileContent}
            required
            placeholder="한줄 소개를 써주세요."
          />
          <div className="btnContainer">
            <button type="submit">유저정보 변경하기</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default withRouter(UserSetting);