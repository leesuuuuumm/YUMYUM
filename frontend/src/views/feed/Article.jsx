import React from "react";
import "./CSS/Article.css";
import sample from "../../_assets/sample.mp4";

function Article(props) {
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
        <h2># 음식명111 </h2>
        <hr />
        <h5>Wed / JAN 20th / 2020 </h5>
        <h4>대전 덕명동 511-7</h4>
        <br />
        <h3>공부하기 싫어 플젝하기 싫어 회식하고 싶어</h3>
      </div>
    </div>
  );
}

export default Article;
