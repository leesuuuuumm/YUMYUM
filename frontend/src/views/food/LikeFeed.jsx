import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Link, withRouter } from "react-router-dom";
import FeedSquareGrid from '../../_components/grid/FeedSquareGrid';
import { getLikeFeeds } from '../../_actions/userAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar:{
    boxShadow: "2px 2px 2px rgba(0,0,0,0.5)"
  },
  title: {
    color:'white',
    fontSize : '1.25em',
    fontFamily : 'GmarketSansMedium',
    textShadow: "2px 2px 2px rgba(255, 235, 59, 0.5)"
  }
}));

const LikeFeed = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = JSON.parse(localStorage.getItem("loggedInfo")).email;
  
  useEffect(() => {
    dispatch(getLikeFeeds(email))
  },[])

  const likeFeeds = useSelector((state) => {
    return JSON.parse(state.user.userLikeFeedSuccess.data)
  },shallowEqual)


  return (
    <>
    <div className={classes.root}>
      <AppBar className={classes.appbar}position="static" style = {{ background: '#8d6e63' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
            <Link to='/map/infomap'><NavigateBeforeIcon /></Link>
          </IconButton>
          <Typography className={classes.title}>
            좋아요 목록 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
      <FeedSquareGrid tileData={likeFeeds}/>
    </>
  );
};

export default withRouter(LikeFeed);