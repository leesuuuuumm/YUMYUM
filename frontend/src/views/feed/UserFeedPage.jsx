import { withRouter } from "react-router-dom";
import React, { useEffect, useState, createContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getFeedByEmail } from "../../_actions/feedAction";
import UserFeedTab from "./UserFeedTab";
import "./CSS/UserFeedPage.css";

// Context 생성
export const FeedsContext = createContext();

function UserFeedPage(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const [feedsCalendar, setfeedsCalendar] = useState([]);
  const dispatch = useDispatch();

  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };

  const getFeedsCalendar = (e) => {
    dispatch(getFeedByEmail("ssafy@ssafy.com"))
      .then((response) => {
        const data = JSON.parse(response.payload.data);
        console.log(data, "월별feeds");

        return data;
      })
      .then((response) => {
        console.log(response, "response2");
        response.map((feed) => {
          feedsCalendar.push(feed);
        });

        console.log(feedsCalendar, "feedsCalendar");
      });
  };

  useEffect(() => {
    onLoggedUser();
    console.log("loggedUser", loggedUser);
  }, []);

  useEffect(() => {
    getFeedsCalendar();
  }, []);

  return (
    <div className="userFeed">
      <FeedsContext.Provider
        value={{ loggedUser: loggedUser.nickname, feeds: feedsCalendar }}
      >
        <UserFeedTab
          username={loggedUser.nickname}
          feedsCalendar={feedsCalendar}
        />
      </FeedsContext.Provider>
    </div>
  );
}

export default withRouter(UserFeedPage);
