import { Link, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, logoutUser } from "../../_actions/userAction";

function MainPage(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const dispatch = useDispatch();

  // componentDidMount, componentDidUpdate와 비슷합니다
  useEffect(() => {
    getProfileUser();
    onLoggedUser();
  }, []);

  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };

  const getProfileUser = (e) => {
    const profileEmail = props.match.params.email;
    dispatch(getUser(profileEmail)).then((res) => {
      const obj = JSON.parse(res.payload.data);
      setProfileUser(obj);
    });
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    alert("나가잇!?");
    props.history.push("/");
  };
  return (
    <section className="login">
      <div className="userContainer">
        <h2 className="userAppTitle">{profileUser.nickname}님의 프로필</h2>
        <br />
        <hr />
        <br />
        <h2 className="userAppTitle"> 현재 계정 :{loggedUser.nickname}</h2>

        <Link to="/user/usersetting" className="userLink">
          {" "}
          유저 정보 변경{" "}
        </Link>
        {loggedUser.email === profileUser.email && (
          <Link to="/user/resetpassword" className="userLink">
            비밀번호 바꾸기
          </Link>
        )}
        <Link to="/feed/createarticle" className="userLink">
          {" "}
          게시글 작성
        </Link>
        <button onClick={onLogoutHandler}>로그아웃</button>
      </div>
    </section>
  );
}

export default withRouter(MainPage);
