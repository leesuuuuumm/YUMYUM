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
  const [nowPages, setNowPages] = useState(1);
  const [fetching, setFetching] = useState(false); 
  const dispatch = useDispatch();

  const getFeedDatas = (e) => {
    dispatch(getAllFeed()).then((res) => {
      const objs = JSON.parse(res.payload.data);
      console.log(objs, "전체")
      const part = objs.slice(0, 10)
      setAllFeeds(objs)
      setFeeds(
        part.reverse().map((obj) => (
          <Slide>
            <Feed key={obj.id} feed={obj} />
          </Slide>
        ))
      );
    });
  };

  
  const fetchMoreFeeds = async () => {
    setFetching(true);
    const fetchedData = allFeeds.slice(nowPages*10, (nowPages+1)*10)
    const addFeeds = (
      fetchedData.reverse().map((obj) => (
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
    if (scrollTop + clientHeight + 100 >= scrollHeight && fetching === false) {
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
