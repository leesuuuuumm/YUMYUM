import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createFeed } from "../../_actions/feedAction";
import { registerPlace } from "../../_actions/mapAction";
import "./CSS/CreateFeed.css";
import ReactStars from "react-rating-stars-component";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { getEmail } from "../../_utils/setToken"

function CreateFeed(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState({});
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const placeInfo = props.location.state.detailPlace;
  const formData = props.location.state.formData;

  useEffect(() => {
    onLoggedUser();
    console.log(props.location.state)
  }, []);

  const dispatch = useDispatch();

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };
  const onLoggedUser = (e) => {
    setLoggedUser(localStorage.getItem("loggedInfo"));
  };
  const ratingChanged = (newRating) => {
    setScore(newRating);
    if (newRating === 1) {
      setComment("먹지마세요......");
    } else if (newRating === 2) {
      setComment("별로에요...");
    } else if (newRating === 3) {
      setComment("먹을만해요.");
    } else if (newRating === 4) {
      setComment("맛있어요!!");
    } else if (newRating === 5) {
      setComment("추천해요!!!!");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(loggedUser);
    console.log(getEmail());
    formData.append("title", title);
    formData.append("content", content);
    formData.append("score", score);
    formData.append("userEmail", getEmail());
    formData.append("placeId", placeInfo.id);
    place.addressName = placeInfo.address_name;
    place.id = placeInfo.id;
    place.phone = placeInfo.phone;
    place.placeName = placeInfo.place_name;
    place.x = placeInfo.x;
    place.y = placeInfo.y;

    if (title && content && score) {
      dispatch(registerPlace(place))
        .then((res) => {
          dispatch(createFeed(formData))
            .then((res) => {
              if (res.payload.status) {
                alert("피드가 작성되었습니다!");
                props.history.push("/feed/flippages");
              } else {
                alert("피드 생성 실패");
              }
            })
            .catch((err) => {
              console.log("피드 실패 에러");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("장소 실패 에러");
          console.log(err);
        });
    } else {
      alert("이건뭐고");
    }
  };

  return (
    <div className="createWapper">
      <h2>맛 평가하기</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="title-box">
          <input
            type="title"
            value={title}
            onChange={onTitleHandler}
            autoFocus
            required
            placeholder="방금 먹은 음식은?"
          />
          <div className="stars">
            <ReactStars
              id="stars"
              count={5}
              onChange={ratingChanged}
              size={35}
              activeColor="#ffd700"
            />
            <br/>
          </div>
          <h3> {comment} </h3>
        </div>
        <div className="content-box">
          <textarea
            rows="4" 
            cols="50"
            type="content"
            value={content}
            onChange={onContentHandler}
            required
            placeholder="음식은 어땠어요?"
          />
        </div>

        <div id="feed-button-wapper">
          <a id="goback">
            <Link to={{
              pathname:"/feed/feedmap",
              state: {
                createFormData: formData,
              }
            }}>
              <ArrowBackRoundedIcon fontSize="large" color="disabled" />
            </Link>
          </a>
          <button id="final" type="submit">
            <DoneOutlineIcon fontSize="large" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(CreateFeed);
