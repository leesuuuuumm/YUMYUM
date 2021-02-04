import React, { useState, useEffect } from 'react';
import "./CSS/FlipPages.css";
import Feed from "./Feed"
import { getAllFeed } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import FullPage from '../../_components/pagecomponents/FullPage';
import Slide  from '../../_components/pagecomponents/Slide';
import { withRouter } from 'react-router-dom';

function FlipPagesUser(props) {
  const [feeds, setFeeds] = useState([]);
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getAllFeed())
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      console.log(objs)
      setFeeds(objs.reverse().map(obj => (<Slide> <Feed key={obj.id} feed={obj} /></Slide>)))
    })
  };

  useEffect(() => {    
    getFeedDatas();
  }, []);

  return (
    <FullPage initialSlide={5}>
      {feeds}
    </FullPage>    
  );
};

export default withRouter(FlipPagesUser);