import React, { useState, useEffect } from 'react';
import "./CSS/FlipPages.css";
import Feed from "./Feed"
import { getFeedCalendarByEmail } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import FullPage from '../../_components/pagecomponents/FullPage';
import Slide  from '../../_components/pagecomponents/Slide';
import { withRouter } from 'react-router-dom';

function FlipPagesUser(props) {
  const [flipPages, SetFlipPages] = useState();
  const [feeds, setFeeds] = useState([]);
  const [idx, setIdx] = useState([]);
  const [someThingDeleted, setSomethingDeleted] = useState(false);
  const dispatch = useDispatch();

  const getFeedDatas = (email) => {
    dispatch(getFeedCalendarByEmail(email))
    .then((res) => {
      const objs = JSON.parse(res.payload.data);
      console.log(objs, "objs")
      const feed = objs.map(obj => (<Slide> <Feed key={obj.id} feed={obj} setSomethingDeleted={setSomethingDeleted} /></Slide>))
      SetFlipPages( <FullPage initialSlide={idx} duration={500}> {feed} </FullPage>)
    })
  };

  useEffect(() => {  
    const {index, email} = props.location.state;
    idx.push(index)
    getFeedDatas(email);
  }, []);

  useEffect(() => {
    if (setSomethingDeleted) {
      console.log("오긴오니?")
      const {index, email} = props.location.state;
      getFeedCalendarByEmail(email)
    }
  },[someThingDeleted])

  return (
    <div>
      {flipPages}  
    </div>
  );
};

export default withRouter(FlipPagesUser);