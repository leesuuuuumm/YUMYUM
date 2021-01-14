import './App.css';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import NotFound from './components/NotFound';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './components/user/ResetPassword';
import MainPage from './components/feed/MainPage';
import SignUpComplete from "./components/user/SignUpComplete";


function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />}/>
          <Route path="/user/join" exact render={() => <SignUp />}/>
          <Route path="/user/complete" exact render={() => <SignUpComplete />}/>
          <Route path="/home" exact render={() => <MainPage />}/>
          <Route path="/user/resetpassword" exact render={() => <ResetPassword />}/>

          <Route path="*" component={NotFound} />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

