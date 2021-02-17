import React, { useState, useEffect } from 'react';
import "./CSS/FlipPages.css";
import Feed from "./Feed"
import { getFeedCalendarByEmail,getFeedMenuDetail } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import FullPage from '../../_components/pagecomponents/FullPage';
import Slide  from '../../_components/pagecomponents/Slide';
import { withRouter } from 'react-router-dom';

function FlipPagesUser(props) {
  const [flipPages, SetFlipPages] = useState();
  const [feeds, setFeeds] = useState([]);
  const [idx, setIdx] = useState([]);
  const dispatch = useDispatch();

  const getFeedDatas = (email) => {
    dispatch(getFeedCalendarByEmail(email))
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      const feed = objs.map(obj => (<Slide> <Feed key={obj.id} feed={obj} /></Slide>))
      SetFlipPages( <FullPage initialSlide={idx} duration={500}> {feed} </FullPage>)
    })
  };

  const getFeedByTitle = (email, title) => {
    dispatch(getFeedMenuDetail(email, title)).then((res) => {
      const reversedObjs = JSON.parse(res.payload.data);
      const objs = reversedObjs.reverse()
      const feed = objs.map(obj => (<Slide> <Feed key={obj.id} feed={obj} /></Slide>))
      SetFlipPages( <FullPage initialSlide={idx} duration={500}> {feed} </FullPage>)
    });
  }

  useEffect(() => {  
    if (props.location.state.index) {
      console.log(props)
      const {index, email} = props.location.state;
      idx.push(index)
      getFeedDatas(email);
    } else {
      const {email, title} = props.location.state
      console.log("다른곳에서 와쓰요")
      console.log(title)
      getFeedByTitle(email, title)
    }
  }, []);

  return (
    <div>
      {flipPages}  
    </div>
  );
};

export default withRouter(FlipPagesUser);