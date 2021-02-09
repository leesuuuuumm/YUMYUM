import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getFeedByEmail } from "../../_actions/feedAction";
import { getUser } from "../../_actions/userAction";
import { getFeedCalendarByEmail } from "../../_actions/feedAction";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FeedSquareGrid from "../../_components/grid/FeedSquareGrid";
import FeedList from "../../_components/grid/FeedList";
import ModalList from "../../_components/modal/ModalList";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
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
  margin-top: 1rem;
  margin-left: 1rem;
`;

const ProfileUser = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
const useStyles = makeStyles({
  fullList: {
    width: "auto",
  },
});

function UserFeedPage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [navheight, setNavHeight] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Modal toggle 함수
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setModalOpen(isOpen);
  };

  useEffect(() => {
    console.log("url", window.location.href);
    let userEmail = props.match.params.email;
    if (userEmail) {
      dispatch(getUser(userEmail)).then((res) => {
        setUsername(JSON.parse(res.payload.data).nickname);
        setInfo(JSON.parse(res.payload.data).introduction);
        console.log("info", info);
      });
      dispatch(getFeedCalendarByEmail(userEmail));
    }
  }, []);

  useEffect(() => {
    let element = document.getElementById('userAppBar');
    setNavHeight(element.clientHeight);
  },[])

  // STORE에 저장된 FEEDS 가져오기
  const feeds = useSelector((state) => {
    return JSON.parse(state.feed.feedsCalenadarInfo.data);
  }, shallowEqual);

  return (
    <div>
      {/* 유저 프로필 상단 */}
      <AppBar color="primary" id="userAppBar">
        <ProfileInfo>
          <ProfileUser>
            <Avatar
              alt={username}
              src={girl}
              style={{ marginRight: "0.5rem" }}
            />
            <h2>{username} </h2>
            {/* Todo: - loginuser라면 띄우기 */}
          </ProfileUser>
          {info ? <p>{info}</p> : <p><br></br></p>}
        </ProfileInfo>
        {/* 탭바 */}
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab selected label="날짜별" {...a11yProps(0)} />
          <Tab selected label="메뉴별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <FeedSquareGrid title="2월" tileData={feeds} navheight={navheight} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <FeedList tileData={feeds} />
      </TabPanel>
      {/* 3 dots 클릭 시 모달 */}
      <Drawer anchor="bottom" open={isModalOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ModalList></ModalList>
        </div>
      </Drawer>
    </div>
  );
}

export default withRouter(UserFeedPage);
