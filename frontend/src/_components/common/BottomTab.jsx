import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBox from "@material-ui/icons/AddBox";
import HomeIcon from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MoodIcon from "@material-ui/icons/Mood";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "10vh",
    position: "fixed",
    bottom: 0,
    zIndex: "100"
  },
  action: {
    minWidth: 20 + "px",
  },
});

function BottomTab() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [loggedUserUrl, setLoggedUserUrl] = useState("");
  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
    setLoggedUserUrl("profile/"+`${userEmail}`)
  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="feed/flippages"
        icon={<HomeIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Map"
        value="map/infomap"
        icon={<LocationOnIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Review"
        value="feed/camera"
        icon={<AddBox />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Eureka"
        value="shout"
        icon={<MoodIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Pick"
        value= {loggedUserUrl}
        icon={<Person />}
        className={classes.action}
      />
    </BottomNavigation>
  );
}

export default BottomTab;
