import React from "react";
import Avatar from "@material-ui/core/Avatar";
import q_brown from "../../_assets/eurekaIcon/q_brown.svg";
import q_yellow from "../../_assets/eurekaIcon/q_yellow.svg";
import q_pink from "../../_assets/eurekaIcon/q_pink.svg";
import q_blue from "../../_assets/eurekaIcon/q_blue.svg";
import q_purple from "../../_assets/eurekaIcon/q_purple.svg";

// clip rect(top right bottom left)
const SelectAvatar = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <Avatar
        alt="1"
        src={q_brown}
        style={{ marginRight: "10px", float: "left" }}
      />
      <Avatar
        alt="2"
        src={q_yellow}
        style={{ marginRight: "10px", float: "left" }}
      />
      <Avatar
        alt="3"
        src={q_pink}
        style={{ marginRight: "10px", float: "left" }}
      />
      <Avatar
        alt="4"
        src={q_blue}
        style={{ marginRight: "10px", float: "left" }}
      />
      <Avatar
        alt="5"
        src={q_purple}
        style={{ marginRight: "10px", float: "left" }}
      />
    </div>
  );
};

export default SelectAvatar;
