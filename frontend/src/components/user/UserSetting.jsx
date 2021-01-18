import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';

function UserSetting(props) {
  const [nickname, setNickName] = useState("");
  const [profileContent, setProfileContent] = useState("");

  return (
    <section className='login'>
    <div className="userContainer">
        <p className="userAppTitle">
          당신의
          <br />
          눈동자에 cheers...
        </p>
        <p className="userTitle">유저 정보 변경</p>
        <form>
          <input
            type="text"
            required
            placeholder="닉네임변경하기"
          />
          <input
            type="password"
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