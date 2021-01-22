import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFeed } from "../../_actions/feedAction";
import sample from "../../_assets/sample.mp4";

function Feed(props) {
  const [feed, setFeed] = useState({});
  const [feedDate, setFeedDate] = useState({});
  const [feedUser, setFeedUser] = useState({});
  const dispatch = useDispatch();

  const getFeedData = (e) => {
    const feedId = 3
    dispatch(getFeed(feedId)).then((res) => {
      const obj = JSON.parse(res.payload.data);
      setFeed(obj);
      setFeedUser(obj.createdUser)
      console.log(feedUser, "피드유저")
      setFeedDate(obj.createdDate)
      console.log(feedDate, "피드 데이터")
    });
  };

  useEffect(() => {
    getFeedData();
  }, []);
  return (
    <div id="videobox">
      <video
        id="background-video"
        className="videoTag"
        src={sample}
        type="video/mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
      />
      <div id="textbox">
        <h2> 메뉴 : #{feed.title} </h2>
        {/* <h6> 작성자 : {feedUser.nickname} </h6> */}
        <hr />
        <h5> 날짜 : {feedDate.dayOfWeek} / {feedDate.month} {feedDate.dayOfMonth} / {feedDate.year} </h5>
        <h4> 식당명 : {feed.storeName} </h4>
        <h4> 위치 : {feed.location} </h4>
        <br />
        <h3> 한줄평 : {feed.content} </h3>
      </div>
     </div>
  );
}

export default Feed;
