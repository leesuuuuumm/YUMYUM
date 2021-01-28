import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_actions/userAction";
import { getFeedByEmail } from "../../_actions/feedAction";
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FeedSquareGrid from '../../_components/grid/FeedSquareGrid';
import FeedList from '../../_components/grid/FeedList';
// import { FeedsContext } from './UserFeedPage';
import styled from "styled-components";
import girl from "../../_assets/shoutIcon/girl.svg";
import './CSS/UserFeedPage.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <div>{children}</div>
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

const ProfileInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
  flex-direction: row;
  align-items: center;
`;

export default function UserFeedBar(props) {
  const { username } = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(1);
  const [feedsCalendar, setfeedsCalendar] = useState([]);
  // Todo : 렌더 보다 늦게 되는 현상 고치기
  // const {loggedUser, feeds} = useContext(FeedsContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    alert("나가잇!?");
    history.push("/");
  };

  const getFeedsCalendar = (e) => {
    dispatch(getFeedByEmail("ssafy@ssafy.com"))
      .then((response) => {
        const data = JSON.parse(response.payload.data);
        console.log(data, "월별feeds");

        return data;
      })
      .then((response) => {
        console.log(response, "response2");
        response.map((feed) => {
          feedsCalendar.push(feed);
        });

        console.log(feedsCalendar, "feedsCalendar");
      });
  };

  useEffect(()=>{
    getFeedsCalendar()
    console.log(feedsCalendar, 'feeds왔니? tabtab', username)
  }, []);

  return (
    <div>
      <AppBar position="static" color="primary">
        <ProfileInfo>
          <Avatar alt={username} src={girl} style={{marginRight:"0.5rem"}}/>
          <h2>{ username }</h2>
        </ProfileInfo>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab selected label="메뉴별" {...a11yProps(0)} />
          <Tab selected label="날짜별" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <FeedList tileData = {feedsCalendar} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FeedSquareGrid title="1월" tileData = {feedsCalendar} style={{ padding: 0 }}/>
        </TabPanel>

    </div>
  );
}

UserFeedBar.propTypes = {
  username: PropTypes.string,
  feedsCalendar: PropTypes.arrayOf(PropTypes.object),
};