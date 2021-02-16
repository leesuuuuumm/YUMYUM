import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import {Collapse} from 'react-collapse';
import { likeFeed } from "../../_actions/feedAction";
import { useDispatch } from "react-redux";
import "./CSS/Feed.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  acorn  from "../../_assets/acorn.png";
import  blankacorn  from "../../_assets/blankacorn.png";
import { Textfit } from 'react-textfit';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';

function SingleFeed(props) {
  const {feed, id, placeName, addressName} = props.location.state;
  const feedUser = feed.user
  const feedDate = feed.createdDate
  const feedVideoPath = feed.videoPath
  const [isOpened, setIsOpened] = useState(false)
  const userUrl = "/profile/"+ `${feedUser.email}`
  const [feedscore, setFeedScore] = useState(feed.score)
  const [likeNum, setLikeNum] = useState(feed.likeCount)
  const [feedContent, setFeedContent] = useState(feed.content)
  const [isFollowed, setIsFollowed] = useState(feed.isLikeUser)
  const [shake, setShake] = useState(0)
  const dispatch = useDispatch();

  const openHandler = () => {
    setIsOpened(!isOpened)
  }

  const goBack = () => {
    if (addressName) {
      props.history.push({
        pathname: "/food/feed",
        state : {
          id : id,
          placeName : placeName,
          addressName : addressName
        },
      });
    } else {
      const loggedEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
      props.history.push({
        pathname: "/food/likefeed",
        state : {
          email: loggedEmail
        },
      });
    }
  }

  const followHandler = (e) => {
    e.preventDefault();
    setIsFollowed(!isFollowed)
    setShake(1)
    if (isFollowed) {
      setLikeNum(likeNum - 1)
    } else {
      setLikeNum(likeNum + 1)
    }
    const loggedEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
    let body = {
      email: loggedEmail,
    }
    dispatch(likeFeed(feed.id, body))
      .then((res) => {
        if (res.payload.status) {
          // alert("쪼아요!!");
        } else {
          alert("조아요 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Card id="video">
      <video
        className="videoTag"
        src={ feedVideoPath }
        type="video/mp4"
        // height="100%"
        width="100%"
        autoPlay
        loop
        muted
      />
      <div id="textbox">
        <a >
          <Link to={{
            pathname: `${userUrl}`,
            state: {
              nickname: feedUser.nickname,
            }
          }}> 
            <h6 id="writer"> By. {feedUser.nickname} </h6>
          </Link>
        </a>
        <CardContent onClick={openHandler}>
          <Textfit id="feedTitle" mode="single" max="30"> <BackspaceOutlinedIcon id="singlefoodIcon" onClick={()=>goBack()}/> {feed.title} </Textfit>
          <br/>
          <div className="stars">
            <ReactStars size={15} edit={false} value={feedscore} />
          </div>
          <br/>
        </CardContent>
        <div id="acorn" >
          { isFollowed ? 
            <img onClick={followHandler} src={acorn} alt="acorn" shake={shake}/> : 
            <img onClick={followHandler} src={blankacorn} alt="blankacorn" shake={shake}/>
          }
          <h3 id="likeText">  {likeNum}  </h3>
        </div>
        <br/>
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
              <h3> " {feedContent} " </h3>
          </div>
        </Collapse>
      </div>
    </Card>
  );
}

export default SingleFeed;
