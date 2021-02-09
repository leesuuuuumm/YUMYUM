import React from "react";
import Avatar from "@material-ui/core/Avatar";
import person1 from "../../_assets/eurekaIcon/girl.svg";
import person2 from "../../_assets/eurekaIcon/girl2.svg";
import person3 from "../../_assets/eurekaIcon/boy.svg";
import person4 from "../../_assets/eurekaIcon/boy2.svg";

const SelectAvatar = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <Avatar
        alt="1"
        src={person1}
        style={{ marginRight: "2px", float: "left" }}
      />
      <Avatar
        alt="2"
        src={person2}
        style={{ marginRight: "2px", float: "left" }}
      />
      <Avatar
        alt="3"
        src={person3}
        style={{ marginRight: "2px", float: "left" }}
      />
      <Avatar
        alt="4"
        src={person4}
        style={{ marginRight: "0.5rem", float: "left" }}
      />
    </div>
  );
};

export default SelectAvatar;
