import React from 'react';
import "../../App.css"
import Article from "./Article";
import Article2 from "./Article2";
import ReactPageScroller from "react-page-scroller";

function FlipPages(props) {
  return (
    <ReactPageScroller 
      ref={c => this.reactPageScroller = c}
    >
      <Article />
      <Article2 />
      <Article />
      <Article2 />
    </ReactPageScroller>
  );
};

export default FlipPages;



