import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getUser, logoutUser } from "../../_actions/userAction";
import UserFeedTab from "./UserFeedTab";
import "./CSS/UserFeedPage.css";

function MainPage(props) {
  const [loggedUser, setLoggedUser] = useState("");
  // const [profileUser, setProfileUser] = useState({});
  // const dispatch = useDispatch();

  useEffect(() => {
    // getProfileUser();
    onLoggedUser();
    console.log("loggedUser", loggedUser);
  }, []);

  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };

  // const getProfileUser = (e) => {
  //   // const profileEmail = props.match.params.email;

  //   dispatch(getUser(profileEmail)).then((res) => {
  //     console.log(res.payload);
  //     const obj = JSON.parse(res.payload.data);
  //     setProfileUser(obj);
  //   });
  // };

  return (
    <div>
      {loggedUser ? (
        <UserFeedTab username={loggedUser.nickname} />
      ) : (
        <div>
          <p>로그인하세요잇!</p>
        </div>
      )}
      <div className="userContainer"></div>
    </div>
  );
}

export default withRouter(MainPage);
