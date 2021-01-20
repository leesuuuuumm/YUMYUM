import React from "react";
import { AppBar, Toolbar ,IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import { Home } from "@material-ui/icons";
import { HashRouter as Router} from 'react-router-dom';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
    justifyContent : `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color : `white`
  }
});

const navLinks = [
  {title : 'Home', path: '/home'},
  {title : 'Login', path: '/'},
  {title : 'Singup', path: '/user/join'},
]

const SearchAppBar = () => {
  const classes = useStyles();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Router>
          <Link to='/map/infomap'>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
          </Link>        
        </Router>
        <List component="nav" aria-labelledby="main navigations" className={classes.navDisplayFlex}>
        {navLinks.map(({ title, path }) => (
          <Router>
            <Link to={path} key={title} className={classes.linkText} >
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          </Router>
        ))}        
        </List>
      </Toolbar>  
    </AppBar>
  )
}

export default SearchAppBar