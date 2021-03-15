import './App.css';
import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from './_utils/theme'
import Login from './views/user/Login';
import SignUp from './views/user/SignUp';
import NotFound from './views/error/NotFound';
import ErrorPage from './views/error/ErrorPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './views/user/ResetPassword';
import CreateFeed from "./views/feed/CreateFeed";
import UserFeedPage from './views/feed/UserFeedPage';
import MyFeedPage from './views/feed/MyFeedPage';
import Camera from "./views/feed/Camera";
import FlipPages from "./views/feed/FlipPages";
import FlipPagesUser from "./views/feed/FlipPagesUser";
import UserSetting from './views/user/UserSetting';
import InfoMap from './views/map/InfoMap';
import EurekaPage from './views/eureka/EurekaPage';
import SearchBar from './views/feed/SearchBar';
import BottomTab from './_components/common/BottomTab';
import FoodFeed from './views/food/FoodFeed';
import LikeFeed from './views/food/LikeFeed';
import PrivateRoute from '../src/_components/common/PrivateRoute';
import LoginRoute from '../src/_components/common/LoginRoute';
import SingleFeed from "../src/views/feed/SingleFeed";
import FloatingButton from "./_components/common/FloatingButton";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <LoginRoute exact path="/" component={Login} />
          {/* <PrivateRoute path="/" exact component= {Login} /> */}
          <PrivateRoute exact path="/feed/flippages" component ={FlipPages}/>
          <PrivateRoute exact path="/feed/flippages/titlefeed" component ={FlipPages}/>
          <PrivateRoute exact path="/feed/flippagesUser" component ={FlipPagesUser}/>
          <Route path="/user/join" exact render={() => <SignUp />}/>
          <PrivateRoute path="/profile/:email" component={UserFeedPage}/>
          <PrivateRoute exact path="/myprofile" component={MyFeedPage}/>
          <PrivateRoute exact path="/user/resetpassword" component={ResetPassword}/>
          <PrivateRoute exact path="/user/usersetting"  component={UserSetting} />
          <PrivateRoute exact path="/feed/createfeed"  component={CreateFeed}/>
          <PrivateRoute exact path="/feed/camera" component={Camera}/>
          <PrivateRoute path='/eureka' component={EurekaPage} />
          <PrivateRoute exact path='/feed/feedmap' component={SearchBar}/>
          <PrivateRoute exact path="/map/infomap" component={InfoMap} />
          <PrivateRoute exact path="/food/feed" component= {FoodFeed} />
          <PrivateRoute exact path="/feed/singlefeed" component= {SingleFeed} />
          <PrivateRoute exact path="/buttontest" component= {FloatingButton} />
          <PrivateRoute exact path="/food/likefeed" component= {LikeFeed} />
          <Route path="/error" component={ErrorPage} />
          <Route path="*" component={NotFound} />
        </Switch>
          <BottomTab />
      </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;