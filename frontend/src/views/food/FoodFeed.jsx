import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Link, withRouter } from "react-router-dom";
import { getPlaceFeed } from '../../_actions/mapAction';
import FeedSquareGrid from '../../_components/grid/FeedSquareGrid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:'white',
    fontSize : '1.25em',
    fontFamily : 'GmarketSansMedium'
  }
}));

const FoodFeed = (props) => {
  const classes = useStyles();
  const {id, placeName, addressName } = props.location.state;
  console.log(props.location.state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPlaceFeed(id)); 
  },[])

  const feeds= useSelector((state) => {
    return JSON.parse(state.map.placeFeedsInfo.data)
  })

  console.log(feeds)

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static" style = {{ background: '#8d6e63' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
            <Link to='/map/infomap'><NavigateBeforeIcon /></Link>
          </IconButton>
          <Typography className={classes.title}>
            {placeName} 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
      <FeedSquareGrid title={addressName} tileData={feeds} />
    </>
  );
};

export default withRouter(FoodFeed);