import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

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
        <h2 className="userAppTitle">새 게시글 작성하기</h2>
        <h4 className="userAppTitle">작성자 : {loggedUser.nickname} </h4>
        <br/>
        <hr/>
        <br/>
        <form>
          <input
            type="title"
            value={title}
            onChange={onTitleHandler}
            autoFocus
            required
            placeholder="게시글 이름"
          />
          <input
            type="content"
            value={content}
            onChange={onContentHandler}
            required
            placeholder="내용을 작성하세요"
          />          
          <div className="btnContainer">
            { title && content && <button type="submit">글 작성하기</button> }
          </div>
          <button onClick={() => props.history.go(-1)}>뒤로가기</button>
        </form>
      </div>
    </section>
  );
};

export default withRouter(CreateArticle);