import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import { Collapse } from 'react-collapse';
import "./CSS/Feed.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FloatingButton from "../../_components/common/FloatingButton";
import { useEffect } from 'react';
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { useDispatch } from "react-redux";
import { updateFeed, likeFeed } from "../../_actions/feedAction";
import  acorn  from "../../_assets/acorn.png";
import  blankacorn  from "../../_assets/blankacorn.png";
import { Textfit } from 'react-textfit';


function Feed(props) {
  const { feed } = props
  const feedUser = feed.user
  const feedDate = feed.createdDate
  const feedVideoPath = feed.videoPath
  const [feedscore, setFeedScore] = useState(feed.score)
  const [likeNum, setLikeNum] = useState(feed.likeCount)
  const [feedContent, setFeedContent] = useState(feed.content)
  const [isOpened, setIsOpened] = useState(false)
  const [isFollowed, setIsFollowed] = useState(feed.isLikeUser)
  const [isThreeDots, setIsThreeDots] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [content, setContent] = useState(feed.content);
  const [score, setScore] = useState(feed.score);
  const [shake, setShake] = useState(0)
  const userUrl = "/profile/"+ `${feedUser.email}`
  const videoId = `${feedVideoPath}`
  const dispatch = useDispatch();

  const openHandler = () => {
    setIsOpened(!isOpened)
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
          console.log(res)
          // alert("쪼아요!!");
        } else {
          alert("조아요 실패");
        }
      })
      .catch((err) => {
        console.log("조아요 에러");
        console.log(err);
      });
  }

  useEffect(() => {
    if (props.match.path ==="/feed/flippagesUser") {
      const loggedEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
      if (loggedEmail === feedUser.email) {
        setIsThreeDots(true)
      }
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
    let body = {
      content: content,
      id: feed.id,
      score: score,
    };
    dispatch(updateFeed(body))
      .then((res) => {
        if (res.payload.status) {
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
  };

  useEffect((e) => {
    if (isDeleted) {
      const videoBox = document.getElementById(videoId)
      const mother = videoBox.parentNode;
      mother.style.display="none";
    }  
  }, [isDeleted])

  return (
    <Card id="video" id={videoId} >
      <video
        className="videoTag"
        src={ feedVideoPath }
        type="video/*"
        // height="100%"
        width="100%"
        autoPlay
        loop
        muted
        playsinline
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
          <Textfit id="feedTitle" mode="single" max="30"> <FastfoodRoundedIcon id="foodIcon"/> {feed.title} </Textfit>
          <br/>
          <div className="stars">
            <ReactStars size={20} edit={false} value={feedscore} />
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
              <h4> {feed.place.addressName} </h4>
              <h5> {feedDate.year}.{feedDate.month.slice(0,3)}.{feedDate.dayOfMonth} / {feedDate.dayOfWeek.slice(0,3)}  </h5>
            </div>
            <hr id="second_line"/>
              <br />
            <TextsmsRoundedIcon id="commentIcon"/>
            <Textfit id="contentText" max="20"> " {feedContent} " </Textfit>
          </div>
        </Collapse>
        <Collapse isOpened={isEdit}>
          <div className="inblock" id="editform">
            <h3> 글 수정해염 </h3>
            <hr/>
            <form onSubmit={onSubmitHandler}>
              <ReactStars
                id="stars"
                count={5}
                value={feedscore}
                onChange={ratingChanged}
                size={35}
                activeColor="#ffd700"
              />
              <textarea
                rows="4" 
                value={content}
                onChange={onContentHandler}
                placeholder={feed.content}
              >
              </textarea>
              <button type="submit">
                <DoneOutlineIcon />
              </button>
            </form>
          </div>
        </Collapse>
      </div>
    </Card>
  );
}


export default withRouter(Feed);
