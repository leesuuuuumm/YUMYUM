import React from "react";
import { withRouter, useHistory } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const ModalList = (props) => {
  const history = useHistory();
  const avatarId = props.avatarId


  const clickSetting = () => {
    history.push({
      pathname:`/user/usersetting`,
      state:{
        avatarId : avatarId
      }
    });
  };

  const resetPassword = () => {
    history.push(`/user/resetpassword`);
  };

  const logout = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("loggedInfo");
    history.push("");
  };

  return (
    <div>
      <List>
        <ListItem button key={"정보 수정"} onClick={clickSetting}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"정보 수정"} />
        </ListItem>
        <ListItem button key={"비밀번호 변경"} onClick={resetPassword}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary={"비밀번호 변경"} />
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

export default withRouter(ModalList);
