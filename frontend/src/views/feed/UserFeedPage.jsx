import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getFeedCalendarByEmail } from "../../_actions/feedAction";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FeedSquareGrid from "../../_components/grid/FeedSquareGrid";
import FeedList from "../../_components/grid/FeedList";
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

  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
    const nickname = JSON.parse(localStorage.getItem("loggedInfo")).nickname;
    setUsername(nickname);
    dispatch(getFeedCalendarByEmail(userEmail));
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
          <IconButton
            aria-label="settings"
            style={{ position: "absolute", right: 0 }}
            onClick={openModal}
          >
            <MoreVertIcon />
          </IconButton>
        </ProfileInfo>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab selected label="날짜별" {...a11yProps(0)} />
          <Tab selected label="메뉴별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <FeedSquareGrid title="1월" tileData={feeds} style={{ padding: 0 }} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <FeedList tileData={feeds} />
      </TabPanel>
    </div>
  );
}

export default withRouter(UserFeedPage);
