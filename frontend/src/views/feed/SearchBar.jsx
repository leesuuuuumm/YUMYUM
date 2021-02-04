import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FeedMap from "./FeedMap.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "0px auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  iconButtonBefore: {
    padding: 10,
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [inputText , setInputText] = useState("");
  const [searchContent, setSerchContent] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.currentTarget.value);
  }  

  const handleSubmit= (e) => {
    e.preventDefault();
    if (inputText){
    setSerchContent(inputText);
    setInputText("");
    } else {
      alert("음식점 이름을 입력해주세요!")
    }
  };

  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <Link to="/feed/camera">
          <IconButton className={classes.iconButtonBefore} aria-label="menu">
            <CameraAltIcon />
          </IconButton>
        </Link>
        <InputBase
          className={classes.input}
          placeholder="음식점 이름은?"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={inputTextHandler}
          size="15"
          id="keyword"
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          // onClick={searchPlaces}//TODO : 시연 끝나고 이주석으로 다시 변경
        >
          <SearchIcon/>
        </IconButton>
      </Paper>
      <FeedMap searchContent={searchContent}/>
    </>
  );
};

export default withRouter(SearchBar);