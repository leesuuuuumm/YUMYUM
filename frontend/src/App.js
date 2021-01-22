import './App.css';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import NotFound from './components/error/NotFound';
import ErrorPage from './components/error/ErrorPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './components/user/ResetPassword';
import MainPage from './components/feed/MainPage';
import CreateArticle from "./components/feed/CreateArticle";
import Camera from "./components/feed/Camera";
import Article from "./components/feed/Article";
import FlipPages from "./components/feed/FlipPages";
import SignUpComplete from "./components/user/SignUpComplete";
import UserSetting from './components/user/UserSetting';
import InfoMap from './components/map/InfoMap';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />}/>
          <Route path="/user/join" exact render={() => <SignUp />}/>
          <Route path="/user/complete" exact render={() => <SignUpComplete />}/>
          <Route path="/profile/:email" render={() => <MainPage />}/>
          <Route path="/user/resetpassword" exact render={() => <ResetPassword />}/>
          <Route path="/user/usersetting" exact render={()=> <UserSetting /> } />
          <Route path="/feed/createarticle" exact render={() => <CreateArticle />}/>
          <Route path="/feed/camera" exact render={() => <Camera />}/>
          <Route path="/feed/article" exact render={() => <Article />}/>
          <Route path="/feed/flippages" exact render={() => <FlipPages />}/>
          <Route path='/map/infomap' exact render={() => <InfoMap />} />
          <Route path="/error" component={ErrorPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

