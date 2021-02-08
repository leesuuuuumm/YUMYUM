import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FeedMap from "./FeedMap.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: '100%',
    margin: "0px auto",
    backgroundColor : "#8d6e63",
  },
  input: {
    marginLeft: "3%",
    flex: 1,
    fontFamily: "GmarketSansMedium",
    padding: "2% 0 2%"
  },
  iconButton: {
    padding: "2%",
  },
  iconButtonBefore: {
    padding: 0,
    marginLeft:"20%"
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [inputText , setInputText] = useState("");
  const [searchContent, setSerchContent] = useState("");
  const [formData, setFormData] = useState(null);
  const [source , setSource] = useState(null);

  useEffect(()=>{
    setFormData(props.location.state.formData);
  },[])

  useEffect(()=>{
    setSource(props.location.state.source);
  },[])

  const inputTextHandler = (e) => {
    setInputText(e.currentTarget.value);
  }

  const handleSubmit= (e) => {
    e.preventDefault();


    if (searchContent === inputText) {
      console.log("이걸보내요!")
    }

    if (inputText){
    setSerchContent(inputText);
    } else {
      alert("음식점 이름을 입력해주세요!")
    }    
  };
  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <Link to= {{
          pathname : "/feed/camera",
          state: {
            preFormData : formData,
            preSource: source
          }
        }}>
          <IconButton className={classes.iconButtonBefore} aria-label="menu">
            <NavigateBeforeIcon />
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
        >
          <SearchIcon/>
        </IconButton>
      </Paper>
      <FeedMap searchContent={searchContent}/>
    </>
  );
};

export default withRouter(SearchBar);