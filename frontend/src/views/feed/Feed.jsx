import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import {Collapse} from 'react-collapse';
import "./CSS/Feed.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FloatingButton from "../../_components/common/FloatingButton";
import { useEffect } from 'react';
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { useDispatch } from "react-redux";
import { updateFeed } from "../../_actions/feedAction";
import  acorn  from "../../_assets/acorn.png";
import  blankacorn  from "../../_assets/blankacorn.png";

function Feed(props) {
  const { feed } = props
  const feedUser = feed.user
  const feedDate = feed.createdDate
  const feedFilePath = feed.filePath
  const [feedscore, setFeedScore] = useState(feed.score)
  const [feedContent, setFeedContent] = useState(feed.content)
  const [isOpened, setIsOpened] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)
  const [isThreeDots, setIsThreeDots] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  const userUrl = "/profile/"+ `${feedUser.email}`
  const dispatch = useDispatch();

  const openHandler = () => {
    setIsOpened(!isOpened)
  }

  const followHandler = () => {
    setIsFollowed(!isFollowed)
    console.log(isFollowed)
  }

  const feedDelete = (e) => {
    props.setSomethingDeleted(true)
  }

  useEffect(() => {
    if (props.match.path ==="/feed/flippagesUser") {
      setIsThreeDots(true)
    }
  })

  useEffect(() => {
    if (isOpened) {
      setIsOpened(false)
    }
  },[isEdit])

  useEffect(() => {
    if (isEdit) {
      setIsEdit(false)
    }
  },[isOpened])

  // Feed UPDATE
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };
  const ratingChanged = (newRating) => {
    setScore(newRating);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (content && score) {
      let body = {
        content: content,
        id: feed.id,
        score: score,
      };
      dispatch(updateFeed(body))
        .then((res) => {
          if (res.payload.status) {
            alert("수정완료!");
            setFeedContent(content)
            setFeedScore(score)
            setIsEdit(false)
          } else {
            alert("피드 수정 실패");
          }
        })
        .catch((err) => {
          console.log("피드 수정 에러");
          console.log(err);
        });
  }};

  useEffect((e) => {
    if (isDeleted) {
      feedDelete()
    }  
  }, [isDeleted])

  return (
    <Card id="videobox" >
      <video
        className="videoTag"
        src={ feedFilePath }
        type="video/mp4"
        height="100%"
        width="100%"
        autoPlay
        loop
        muted
      />
      <div id="textbox">
        { isThreeDots ? 
        <FloatingButton 
          id="threeDots" 
          setIsDeleted={setIsDeleted} 
          setIsEdit={setIsEdit} 
          isEdit={isEdit} 
          onClick={openHandler} 
          feedId={feed.id}
        /> :
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
        }
        <CardContent onClick={openHandler}>
          <h1> <FastfoodRoundedIcon id="foodIcon"/> {feed.title} </h1>
          <br/>
          <div className="stars">
            <ReactStars size={15} edit={false} value={feedscore} />
          </div>
          <br/>
        </CardContent>
        <div id="acorn" >
          { isFollowed ? <img onClick={followHandler} src={acorn} alt="acorn"/> : <img onClick={followHandler} src={blankacorn} alt="blankacorn"/>}
        </div>
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
        <Collapse isOpened={isEdit}>
          <div className="inblock">
            <h3> "수정하쉴?" </h3>
            <form onSubmit={onSubmitHandler}>
              <ReactStars
                id="stars"
                count={5}
                onChange={ratingChanged}
                size={35}
                activeColor="#ffd700"
              />
              <textarea
                rows="5" 
                cols="50"
                type="content"
                value={content}
                onChange={onContentHandler}
                required
                placeholder="feed.content"
              />
              <button id="final" type="submit">
                <DoneOutlineIcon fontSize="large" />
              </button>
            </form>
          </div>
        </Collapse>
      </div>
    </Card>
  );
}


export default withRouter(Feed);
