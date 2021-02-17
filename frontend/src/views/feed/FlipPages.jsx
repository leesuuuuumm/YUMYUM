import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./CSS/FlipPages.css";
import Feed from "./Feed";
import { getAllFeed } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import FullPage from "../../_components/pagecomponents/FullPage";
import Slide from "../../_components/pagecomponents/Slide";

function FlipPages(props) {
  const [feeds, setFeeds] = useState([]);
  const [allFeeds, setAllFeeds] = useState([]);
  const [nowPages, setNowPages] = useState(5);
  const [fetching, setFetching] = useState(false); 
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getAllFeed()).then((res) => {
      const reversedObjs = JSON.parse(res.payload.data);
      const objs = reversedObjs.reverse()
      const part = objs.slice(0, 5)
      setAllFeeds(objs)
      setFeeds(
        part.map((obj) => (
          <Slide key={obj.id}>
            <Feed key={obj.id} feed={obj} />
          </Slide>
        ))
      );
    });
  };

  
  const fetchMoreFeeds = async () => {
    setFetching(true);
    const fetchedData = allFeeds.slice(nowPages, (nowPages+1))
    const addFeeds = (
      fetchedData.map((obj) => (
        <Slide>
          <Feed key={obj.id} feed={obj} />
        </Slide>
      ))
    );
    const mergedData = feeds.concat(...addFeeds);
    setFeeds(mergedData);
    setNowPages(nowPages + 1)
    setFetching(false);
  };
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + clientHeight >= scrollHeight && fetching === false) {
      fetchMoreFeeds();
    }
   };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    getFeedDatas();
  }, []);

  return (
  <FullPage>
    {feeds}
  </FullPage> 
  )
}

export default withRouter(FlipPages);
