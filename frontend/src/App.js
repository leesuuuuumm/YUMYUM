import './App.css';
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
import Camera from "./views/feed/Camera";
import FlipPages from "./views/feed/FlipPages";
import SignUpComplete from "./views/user/SignUpComplete";
import UserSetting from './views/user/UserSetting';
import InfoMap from './views/map/InfoMap';
import ShoutPage from './views/shout/ShoutPage';
import FeedMap from './views/feed/FeedMap';
import BottomTab from './_components/common/BottomTab';
import FoodFeed from './views/food/FoodFeed';



function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />}/>
          <Route path="/user/join" exact render={() => <SignUp />}/>
          <Route path="/user/complete" exact render={() => <SignUpComplete />}/>
          <Route path="/profile/:email" render={() => <UserFeedPage />}/>
          <Route path="/user/resetpassword" exact render={() => <ResetPassword />}/>
          <Route path="/user/usersetting" exact render={()=> <UserSetting /> } />
          <Route path="/feed/createfeed" exact render={() => <CreateFeed />}/>
          <Route path="/feed/camera" exact render={() => <Camera />}/>
          <Route path="/feed/flippages" exact render={() => <FlipPages />}/>
          <Route path='/shout' exact render={() => <ShoutPage />} />
          <Route path='/feed/feedmap' exact render ={() => <FeedMap />}/>
          <Route path="/map/infomap" exact render={() => <InfoMap />} />
          <Route path="/food/feed" exact render={() => <FoodFeed />} />
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