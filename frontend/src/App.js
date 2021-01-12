import './assets/App.css';
import Login from './views/user/Login';
import NotFound from './components/NotFound';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login />}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
