import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBox from "@material-ui/icons/AddBox";
import HomeIcon from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import MoodIcon from "@material-ui/icons/Mood";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "10vh",
    position: "fixed",
    bottom: 0,
    zIndex: "100",
    boxShadow: "0px -5px 11px -2px rgba(0,0,0,0.1)"
  },
  action: {
    minWidth: 20 + "px",
  },
});

function BottomTab(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [loggedUserUrl, setLoggedUserUrl] = useState("");
  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push(`${newValue}`);
    setValue(newValue);
    // setValue("");
  };

  if (props.location.pathname === "/") {
    return false;
  } else if (props.location.pathname === "/user/join") {
    return false;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="/feed/flippages"
        icon={<HomeIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Map"
        value="/map/infomap"
        icon={<LocationOnIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Review"
        value="/feed/camera"
        icon={<AddBox />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Eureka"
        value="/eureka"
        icon={<MoodIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Pick"
        value="/myprofile"
        icon={<Person />}
        className={classes.action}
      />
    </BottomNavigation>
  );
}

export default withRouter(BottomTab);
