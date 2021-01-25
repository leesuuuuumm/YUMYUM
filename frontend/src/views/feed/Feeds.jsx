import React, { useState, useEffect } from 'react';
import "../../App.css"
import Feed from "./Feed";
import { getFeedByEmail } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import ReactPageScroller from "react-page-scroller";

function Feeds(props) {
  const {feeds} = props

  return (
    <>
      { feeds.map(obj => <div> <Feed key={obj.id} feed={obj} /> </div>)}
    </>
  );
};

export default Feeds;



