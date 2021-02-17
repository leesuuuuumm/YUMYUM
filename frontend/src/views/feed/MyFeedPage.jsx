import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getFeedByEmail } from "../../_actions/feedAction";
import { getUser } from "../../_actions/userAction";
import { getFeedCalendarByEmail, getFeedMenu } from "../../_actions/feedAction";
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
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";

import "./CSS/UserFeedPage.css";
import "./CSS/MyFeedPage.css";
import { getEmail } from "../../_utils/setToken";

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
  appbar : {
    boxShadow: "2px 2px 2px rgba(0,0,0,0.7)",
  },
  fullList: {
    width: "auto"
  },
  tablistbar:{
    borderTop: "1px solid rgba(0,0,0,0.7)",
    backgroundColor: "white",
    color: "#8d6e63"
  },
  tableft:{
    borderRight: "1px solid rgba(0,0,0,0.7)",
    color: "gray",
    fontFamily: "GmarketSansMedium"
  },
  tabright:{
    color: "gray",
    fontFamily: "GmarketSansMedium"
  }
});

function UserFeedPage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [navheight, setNavHeight] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const [selectAvatar, setSelectAvatar] = useState("");
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
    const userEmail = getEmail();
    dispatch(getUser(userEmail))
      .then((res) => {
        setUsername(JSON.parse(res.payload.data).nickname);
        setInfo(JSON.parse(res.payload.data).introduction);
        setAvatarId(JSON.parse(res.payload.data).avatar);
        dispatch(getFeedCalendarByEmail(userEmail));
        dispatch(getFeedMenu(userEmail));
      })
      .catch((err) =>{
        console.log(err)
      })

  }, []);

  useEffect(() => {
    let element = document.getElementById("myAppBar");
    setNavHeight(element.clientHeight);
  }, []);

  useEffect(()=> {
    if (avatarId === 0){
      setSelectAvatar(q_brown)
    } else if(avatarId === 1){
      setSelectAvatar(q_yellow)
    } else if(avatarId === 2){
      setSelectAvatar(q_pink)
    } else if(avatarId === 3){
      setSelectAvatar(q_blue)
    } else if (avatarId === 4){
      setSelectAvatar(q_purple)
    } 
  },[avatarId])
  
  // STORE에 저장된 FEEDS 가져오기
  const {feeds, feedsByMenu} = useSelector((state) => {
    return {
      feeds: JSON.parse(state.feed.feedsCalenadarInfo.data),
      feedsByMenu : JSON.parse(state.feed.feedsMenuInfo.data)};
  }, shallowEqual);

  return (
    <div>
      {/* 유저 프로필 상단 */}
      <AppBar className={classes.appbar} color="primary" id="myAppBar">
        <ProfileInfo>
          <ProfileUser>
            <Avatar
              alt={username}
              src={selectAvatar}
              style={{ marginRight: "0.5rem" }}
            />
            <h2>{username}</h2>
            {/* Todo: - loginuser라면 띄우기 */}

            <IconButton
              aria-label="settings"
              style={{ position: "absolute", right: 0 }}
              onClick={toggleDrawer(true)}
            >
              <MoreVertIcon />
            </IconButton>
          </ProfileUser>
          {info ? <p>{info}</p> : <p>한 줄 소개를 작성해 주세요</p>}
        </ProfileInfo>
        {/* 탭바 */}
        <Tabs className={classes.tablistbar} textColor="primary" value={value} onChange={handleChange} variant="fullWidth">
          <Tab className={classes.tableft} selected label="최신순" {...a11yProps(0)} />
          <Tab className={classes.tabright} selected label="메뉴별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <FeedSquareGrid tileData={feeds} navheight={navheight} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <FeedList tileData={feedsByMenu} navheight={navheight} />
      </TabPanel>
      {/* 3 dots 클릭 시 모달 */}
      <Drawer anchor="bottom" open={isModalOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ModalList avatarId={avatarId}></ModalList>
        </div>
      </Drawer>
    </div>
  );
}

export default withRouter(UserFeedPage);
