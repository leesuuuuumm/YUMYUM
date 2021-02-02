import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getFeedCalendarByEmail } from "../../_actions/feedAction";
import { makeStyles } from "@material-ui/core/styles";
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
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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

const useStyles = makeStyles({
  fullList: {
    width: "auto",
  },
});

function UserFeedPage() {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [feeds, setFeed] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Modal open
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setModalOpen(isOpen);
  };
  // Modal에 들어갈 list
  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Logout", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    // const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
    // const nickname = JSON.parse(localStorage.getItem("loggedInfo")).nickname;
    setUsername("ahyeon");
    // dispatch(getFeedCalendarByEmail(userEmail));
  }, []);
  // const feeds = useSelector((state) => {
  //   return JSON.parse(state.feed.feedsCalenadarInfo.data);
  // }, shallowEqual);

  return (
    <div>
      <AppBar position="static" color="primary">
        <ProfileInfo>
          <Avatar alt={username} src={girl} style={{ marginRight: "0.5rem" }} />
          <h2>{username}</h2>
          <>
            <IconButton
              aria-label="settings"
              style={{ position: "absolute", right: 0 }}
              onClick={toggleDrawer(true)}
            >
              <MoreVertIcon />
              <Drawer
                anchor="bottom"
                open={isModalOpen}
                onClose={toggleDrawer(false)}
              >
                {list}
              </Drawer>
            </IconButton>
          </>
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
