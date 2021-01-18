import React from "react";
import {AppBar, Toolbar ,IconButton } from "@material-ui/core";
import {Home} from "@material-ui/icons";

const navLinks = [
  {title : 'Home', path: '/home'},
  {title : 'login', path: '/'},
]

const SearchAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>
      </Toolbar>  
    </AppBar>
  )
}

export default SearchAppBar