import { withRouter } from "react-router-dom";
import React, { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import UserFeedBar from "./UserFeedBar";
import "./CSS/UserFeedPage.css";

// Context 생성
export const FeedsContext = createContext();

function UserFeedPage(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const dispatch = useDispatch();

  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };

  useEffect(() => {
    onLoggedUser();
    console.log("loggedUser", loggedUser);
  }, []);

  return (
    <div className="userFeed">
      <FeedsContext.Provider value={{ loggedUser: loggedUser.nickname }}>
        <UserFeedBar username={loggedUser.nickname} />
      </FeedsContext.Provider>
    </div>
  );
}

export default withRouter(UserFeedPage);
