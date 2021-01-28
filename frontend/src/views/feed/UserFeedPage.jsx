import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getFeedByEmail } from "../../_actions/feedAction";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FeedSquareGrid from "../../_components/grid/FeedSquareGrid";
import FeedList from "../../_components/grid/FeedList";
// import { FeedsContext } from './UserFeedPage';
import styled from "styled-components";
import girl from "../../_assets/shoutIcon/girl.svg";
import "./CSS/UserFeedPage.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <div>{children}</div>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfileInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
  flex-direction: row;
  align-items: center;
`;

function UserFeedPage() {
  const theme = useTheme();

  const [value, setValue] = React.useState(1);
  const [username, setUsername] = React.useState("");
  const [feedsCalendar, setfeedsCalendar] = useState();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getFeedsCalendar = (email) => {
  //   dispatch(getFeedByEmail(email))
  //     .then((response) => {
  //       const data = JSON.parse(response.payload.data);
  //       console.log(data, "월별feeds");
  //       return data;
  //     })
  //     .then((response) => {
  //       console.log(response, "response2");
  //       // response.map((feed) => {
  //       setfeedsCalendar(feeds);
  //       // feedsCalendar.push(feed);
  //       // });
  //       console.log(feedsCalendar, "feedsCalendar");
  //     });
  // };

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
    const nickname = JSON.parse(localStorage.getItem("loggedInfo")).nickname;
    setUsername(nickname);
    dispatch(getFeedByEmail(userEmail));
    // getFeedsCalendar(userEmail);

    console.log(feeds, "======================");
  }, []);
  const feeds = useSelector((state) => {
    return JSON.parse(state.feed.feedsCalenadarInfo.data);
  }, shallowEqual);

  return (
    <div>
      <AppBar position="static" color="primary">
        <ProfileInfo>
          <Avatar alt={username} src={girl} style={{ marginRight: "0.5rem" }} />
          <h2>{username}</h2>
        </ProfileInfo>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab selected label="메뉴별" {...a11yProps(0)} />
          <Tab selected label="날짜별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <FeedList tileData={feeds} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <FeedSquareGrid title="1월" tileData={feeds} style={{ padding: 0 }} />
      </TabPanel>
    </div>
  );
}

export default withRouter(UserFeedPage);
