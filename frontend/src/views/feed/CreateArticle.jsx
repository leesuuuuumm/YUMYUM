import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function CreateArticle(props) {
  const [loggedUser, setLoggedUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    onLoggedUser()
  }, []);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  }
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  }
  const onLoggedUser = (e) => {
    setLoggedUser(JSON.parse(localStorage.getItem("loggedInfo")));
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  
  return (
    <section className="login">
      <div className="userContainer">
        <h2 className="userAppTitle">오늘의 맛일기</h2>
        <h3>작성자 : {loggedUser.nickname}</h3>
        <br/>
        <hr/>
        <form>
          <input
            type="title"
            value={title}
            onChange={onTitleHandler}
            autoFocus
            required
            placeholder="무엇을 드셨습니까?"
          />
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
          <input
            type="content"
            value={content}
            onChange={onContentHandler}
            required
            placeholder="후기를 남겨주세요!"
          />          
          <button onClick={() => props.history.go(-1)}>뒤로가기</button>
          <button onClick={() => props.history.push("/feed/flippages")}>등록하기</button>
        </form>
      </div>
    </section>
  );
};

export default withRouter(CreateArticle);