import './App.css';
import Login from './views/user/Login';
import SignUp from './views/user/SignUp';
import NotFound from './views/error/NotFound';
import ErrorPage from './views/error/ErrorPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './views/user/ResetPassword';
import UserFeedPage from './views/feed/UserFeedPage';
import CreateArticle from "./views/feed/CreateArticle";
import Camera from "./views/feed/Camera";
import Article from "./views/feed/Article";
import FlipPages from "./views/feed/FlipPages";
import SignUpComplete from "./views/user/SignUpComplete";
import UserSetting from './views/user/UserSetting';
import InfoMap from './views/map/InfoMap';
import BarkPage from './views/bark/BarkPage';
import BottomTab from './_components/common/BottomTab';
import ReviewMap from './views/map/ReviewMap';
import UserFeedTab from './views/feed/UserFeedTab';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />}/>
          <Route path="/user/join" exact render={() => <SignUp />}/>
          <Route path="/user/complete" exact render={() => <SignUpComplete />}/>
          <Route path="/profile/:email" render={() => <UserFeedPage />}/>
          <Route path="/user/resetpassword" exact render={() => <ResetPassword />}/>
          <Route path="/user/usersetting" exact render={()=> <UserSetting /> } />
          <Route path="/feed/createarticle" exact render={() => <CreateArticle />}/>
          <Route path="/feed/camera" exact render={() => <Camera />}/>
          <Route path="/feed/article" exact render={() => <Article />}/>
          <Route path="/feed/flippages" exact render={() => <FlipPages />}/>
          <Route path='/bark' exact render={() => <BarkPage />} />
          <Route path='/feed/test' exact render={() => <UserFeedTab />} />
          <Route path='/map/reviewmap' exact render ={() => <ReviewMap />}/>
          <Route path="/map/infomap" exact render={() => <InfoMap />} />
          <Route path="/error" component={ErrorPage} />
          <Route path="*" component={NotFound} />
        </Switch>
        <BottomTab />
      </Router>
      
    </div>
  );
}

export default App;