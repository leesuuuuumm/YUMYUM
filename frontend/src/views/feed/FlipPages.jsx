import React, { useState, useEffect } from 'react';
import "../../App.css"
import Feed from "./Feed"
import { getFeedByEmail } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import ReactPageScroller from "react-page-scroller";

function FlipPages(props) {
  const [feeds, setFeeds] = useState([]);
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getFeedByEmail("deckloc603@gmail.com"))
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      // feeds.push(objs)
      // objs.map(obj => feeds.push(obj))
      objs.map(obj =>  feeds.push(<Feed key={obj.id} feed={obj} />))
      console.log(feeds)
    })
  };

  useEffect(() => {    
    getFeedDatas();
  }, []);
  
  return (
    <ReactPageScroller>
      <div>
        <h1>??</h1>
      </div>
      <div>
        { feeds[0] }
      </div>
    </ReactPageScroller>    
  );
};

export default FlipPages;