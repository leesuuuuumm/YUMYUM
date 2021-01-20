import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Article from "./Article";

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
  
  return (
    <section className="login">
      <div className="userContainer">
        <h2 className="userAppTitle">오늘의 맛일기</h2>
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
          <input
            type="content"
            value={content}
            onChange={onContentHandler}
            required
            placeholder="후기를 남겨주세요!"
          />          
          <div className="btnContainer">
            { title && content && <button type="submit">글 작성하기</button> }
          </div>
          <button onClick={() => props.history.go(-1)}>뒤로가기</button>
          <button onClick={() => props.history.push("/feed/article")}>등록하기</button>
        </form>
      </div>
    </section>
  );
};

export default withRouter(CreateArticle);