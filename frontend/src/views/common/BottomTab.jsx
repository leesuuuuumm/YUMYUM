import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
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
});

function BottomTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <Router>
        <BottomNavigationAction
          label="Home"
          value="home"
          component={Link}
          to="/feed/flippages"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="My Pick"
          value="/"
          component={Link}
          to="/profile/:email"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Review"
          value="/feed/camera"
          component={Link}
          to="/feed/camera"
          icon={<CreateIcon />}
        />
        <BottomNavigationAction
          label="Map"
          value="/map/infomap"
          component={Link}
          to="/map/infomap"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Bark"
          value="/bark"
          component={Link}
          to="/bark"
          icon={<MoodIcon />}
        />
      </Router>
    </BottomNavigation>
  );
}

export default BottomTab;
