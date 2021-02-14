import React from "react";
import Avatar from "@material-ui/core/Avatar";
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";
import { makeStyles } from "@material-ui/core/styles";
import "./SelectAvatar.css"

const useStyles = makeStyles({ 
    img : {
      backgroundColor: "yellow"
    }
});

// clip rect(top right bottom left)
const SelectAvatar = (props) => {
  const classes = useStyles();

  const chooseAvatar = (index) =>{
    props.setAvartarId(index)
    for (let i = 0; i < 5 ; i ++) {
      if (i === Number(index)){
        let element = document.getElementById("Avatar"+index).children;
        element[0].style.backgroundColor="yellow"
      } else {
        let element = document.getElementById("Avatar"+i).children;
        element[0].style.backgroundColor="white"
        console.log(i)
      }
    }
  }
  return (
    <div style={{ margin: "0 auto" }}>
      <Avatar
        alt="0"
        id = "Avatar0"
        className={classes.imgProps}
        src={q_brown}
        style={{ marginRight: "10px", float: "left" }}
        onClick={() => chooseAvatar("0")}
      />
      <Avatar
        alt="1"
        id = "Avatar1"
        src={q_yellow}
        style={{ marginRight: "10px", float: "left" }}
        onClick={() =>chooseAvatar("1")}
      />
      <Avatar
        alt="2"
        id = "Avatar2"
        src={q_pink}
        style={{ marginRight: "10px", float: "left" }}
        onClick={() =>chooseAvatar("2")}
      />
      <Avatar
        alt="3"
        id = "Avatar3"
        src={q_blue}
        style={{ marginRight: "10px", float: "left" }}
        onClick={() =>chooseAvatar("3")}
      />
      <Avatar
        alt="4"
        id = "Avatar4"
        src={q_purple}
        style={{ marginRight: "10px", float: "left" }}
        onClick={() =>chooseAvatar("4")}
      />
    </div>
  );
};

export default SelectAvatar;
