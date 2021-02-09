import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import {Collapse} from 'react-collapse';
import "./CSS/Feed.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function SingleFeed(props) {
  const {feed, id, placeName, addressName} = props.location.state;
  const feedUser = feed.user
  const feedDate = feed.createdDate
  const feedURL = feed.videoPath.split('/')
  const myVideo = feedURL[6]
  const feedFilePath = feed.videoPath
  const [isOpened, setIsOpened] = useState(false)
  const videoURL = "http://18.191.183.197:8080/single/" + `${myVideo}`
  const userUrl = "/profile/"+ `${feedUser.email}`

  const openHandler = () => {
    setIsOpened(!isOpened)
    console.log(isOpened)
  }

  const goBack = () => {
    console.log(props.location.state)
    props.history.push({
      pathname: "/food/feed",
      state : {
        id : id,
        placeName : placeName,
        addressName : addressName
      },
    });
  }

  return (
    <Card id="videobox">
      <button onClick={goBack}>go!</button>
      <video
        id="background-video"
        className="videoTag"
        src={ feedFilePath }
        type="video/mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
      />
    <div id="textbox">
      <CardContent onClick={openHandler}>
        <h1> <FastfoodRoundedIcon id="foodIcon"/> {feed.title} </h1>
        <a href="">
          <Link to={{
                pathname: `${userUrl}`,
                state: {
                  nickname: feedUser.nickname,
                }
              }}> 
            <h6> By. {feedUser.nickname} </h6>
          </Link>
        </a>
        <br/>
        <div className="stars">
          <ReactStars size={15} edit={false} value={feed.score} />
        </div>
      </CardContent>
      <br/>
      {/* <CardActions disableSpacing>
        <IconButton
          onClick={openHandler}
        >
          <ExpandMoreIcon id="scrollDown" />
        </IconButton>
      </CardActions> */}
      <Collapse isOpened={isOpened}>
        <div className="inblock">
          <LocalDiningRoundedIcon id="nameIcon" fontSize="small"/> 
          <h4> {feed.place.placeName} </h4>
          <div>
            <StorefrontRoundedIcon id="storeIcon" fontSize="small" />
            <h5> {feed.place.addressName} </h5>
            <h5> {feedDate.year}.{feedDate.month.slice(0,3)}.{feedDate.dayOfMonth} / {feedDate.dayOfWeek.slice(0,3)}  </h5>
          </div>
          <hr id="second_line"/>
            <br />
          <TextsmsRoundedIcon id="commentIcon"/>
            <h3> " {feed.content} " </h3>
        </div>
      </Collapse>
    </div>
  </Card>
  );
}

export default SingleFeed;
