import React, { useState, useEffect } from 'react';
import "./CSS/FlipPages.css";
import Feed from "./Feed"
import { getFeedByEmail, getAllFeed } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import FullPage from '../../_components/pagecomponents/FullPage';
import Slide  from '../../_components/pagecomponents/Slide';

function FlipPages(props) {
  const [feeds, setFeeds] = useState([]);
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getAllFeed())
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      setFeeds(objs.map(obj => (<Slide> <Feed key={obj.id} feed={obj} /></Slide>)))
    })
  };

  useEffect(() => {    
    getFeedDatas();
  }, []);

  return (
    <FullPage>
      {feeds}
    </FullPage>    
  );
};

export default FlipPages;