import React from 'react';
import "../../App.css"
import sample from "../../assets/sample.mp4";

function Article(props) {
  return (
    <section className="login">
      <div className="userContainer">
        <video id="background-video" className='videoTag' autoPlay loop muted>
            <source src={sample} type='video/mp4' />
        </video>
        <div id="content-in-video">
          <h2># 음식명 </h2>
          <hr/>
          <h5>Wed / JAN 20th / 2020  </h5>
          <h4>대전 덕명동 511-7</h4>
          <br/>
          <h3>공부하기 싫어 플젝하기 싫어 회식하고 싶어</h3>
        </div>
      </div>
    </section>
  );
};


export default Article;