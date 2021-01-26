import React, { useEffect, useState } from "react";
import sample from "../../_assets/sample.mp4";
import "./CSS/Feed.css"

function Feed(props) {
  const { feed } = props
  const feedDate = feed.user
  const feedUser = feed.createdDate
  const feedURL = feed.filePath.split('/')
  const myVideo = feedURL[6]
  const videoURL = "http://i4b101.p.ssafy.io:8080/single/" + `${myVideo}`

  return (
    <div id="videobox">
      <video
        id="background-video"
        className="videoTag"
        src={ videoURL }
        type="video/mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
      />
      <div id="textbox">
        <h2> 메뉴 : #{feed.title} </h2>
        <h6> 작성자 : {feedUser.nickname} </h6>
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
