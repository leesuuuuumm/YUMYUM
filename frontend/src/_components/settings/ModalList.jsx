import React from "react";
import { withRouter, useHistory } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const ModalList = () => {
  const history = useHistory();

  const clickSetting = () => {
    history.push(`/user/usersetting`);
  };

  const logout = () => {
    localStorage.removeItem("loggedInfo");
    history.push("");
  };

  return (
    <div>
      <List>
        <ListItem button key={"설정"} onClick={clickSetting}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"설정"} />
        </ListItem>
        <ListItem button key={"로그아웃"} onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"로그아웃"} />
        </ListItem>
      </List>
    </div>
  );
};

export default ModalList;
