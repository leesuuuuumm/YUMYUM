import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:'black',
  }
}));

const FoodFeed = (props) => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <AppBar position="static" style = {{ background: '#fafafa' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
            <Link to='/map/infomap'><NavigateBeforeIcon /></Link>
          </IconButton>
          <Typography variant="h8" className={classes.title}>
            음식점 이름 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default FoodFeed;