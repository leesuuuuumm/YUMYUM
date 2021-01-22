import React from 'react';
import "../../App.css"
import sample2 from "../../assets/sample2.mp4";

function Article2(props) {
  return (
    <div id="videobox">
      <video 
        id="background-video" 
        className='videoTag' 
        src={sample2} 
        type='video/mp4'
        width= "100%"
        height= "100%"
        autoPlay 
        loop 
        muted />
      <div id="textbox">
        <h2># 음식명2222 </h2>
        <hr/>
        <h5>Wed / JAN 45th / 2048  </h5>
        <h4>대전 봉명동 레자미 802호</h4>
        <br/>
        <h3>난 누군가, 여긴 어딘가</h3>
      </div>
    </div>

  );
};


export default Article2;