import React, { useState, useEffect, createRef } from 'react';
import "../../App.css"
import Feed from "./Feed"
import { getFeedByEmail } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
// import ReactPageScroller from "react-page-scroller";
import FullPage from '../../_components/pagecomponents/FullPage';
import Slide  from '../../_components/pagecomponents/Slide';

function FlipPages(props) {
  const [feeds, setFeeds] = useState([]);
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getFeedByEmail("qq@qq.qq"))
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      console.log(objs)
      // setFeeds(objs)
      // objs.map(obj => feeds.push(obj))
      setFeeds(objs.map(obj => (<Slide> <Feed key={obj.id} feed={obj} /></Slide>)))
      // objs.map(obj =>  feeds.push(<Slide> <Feed key={obj.id} feed={obj} /> </Slide>))
      console.log(feeds)
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