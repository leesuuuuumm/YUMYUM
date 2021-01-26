import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_actions/userAction";
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FeedSquareGrid from '../../_components/grid/FeedSquareGrid';
import FeedList from '../../_components/grid/FeedList';
import { FeedsContext } from './UserFeedPage';

import wine from "../../_assets/wine.jpg";
import neon from "../../_assets/neon.jpg";
import yellowwine from "../../_assets/yellowwine.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 100+"%",
  },
}));

const tileData = [
  {
    img: wine,
    title: "Image",
    author: "author",
  },
  {
    img: neon,
    title: "Image",
    author: "author",
  },
  {
    img: yellowwine,
    title: "Image",
    author: "author",
  },
];


export default function UserFeedTab(props) {
  const { username } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [imgData, setImgData] = React.useState(tileData);
  const {loggedUser, feeds} = useContext(FeedsContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    alert("나가잇!?");
    history.push("/");
  };

  useEffect(()=>{
    console.log(feeds, 'feeds왔니?')
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <div><h2>{ username }</h2></div>
        <button onClick={onLogoutHandler}>로그아웃</button>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="메뉴별" {...a11yProps(0)} />
          <Tab label="날짜별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FeedList tileData = {feeds} />

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FeedSquareGrid title="12월" tileData = {feeds} style={{ padding: 0 }}/>
        </TabPanel>
      {/* </SwipeableViews> */}
    </div>
  );
}

UserFeedTab.propTypes = {
  username: PropTypes.string,
};