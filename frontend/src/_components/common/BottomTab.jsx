import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MoodIcon from "@material-ui/icons/Mood";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  action: {
    // padding: 6 + "px " + 12 + "px " + 8 + "px",
    minWidth: 20 + "px",
  },
});

function BottomTab() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };

  useEffect(() => {
    // getProfileUser();
    onLoggedUser();
    console.log("loggedUser", loggedUser);
    if (!loggedUser) {
      alert("로그인 하세요!");
      history.push("/");
    }
  }, []);

  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value=""
        icon={<HomeIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Pick"
        value="profile/:email"
        icon={<FavoriteIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Review"
        value="feed/camera"
        icon={<CreateIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Map"
        value="map/infomap"
        icon={<LocationOnIcon />}
        className={classes.action}
      />
      <BottomNavigationAction
        label="Bark"
        value="bark"
        icon={<MoodIcon />}
        className={classes.action}
      />
    </BottomNavigation>
  );
}

export default BottomTab;
