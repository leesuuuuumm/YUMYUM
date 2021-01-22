import React from 'react';
import "../../App.css"
import Article from "./Article";
import Article2 from "./Article2";
import Feed from "./Feed";
import ReactPageScroller from "react-page-scroller";

function FlipPages(props) {
  return (
    <ReactPageScroller >
      <Article />
      <Article2 />
      <Feed />
    </ReactPageScroller>
  );
};

export default FlipPages;



