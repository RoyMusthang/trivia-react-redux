import React from 'react';
// import logo from './trivia.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';  
import LoginScreen from './pages/login';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        {/* <Route exact path="/game" component={ GameScreen } /> */}
        {/* <Route exact path="/config" component={ ConfigsScreen } /> */}
        {/* <Route exact path="/feedback" component={ FeedbackScreen } /> */}
        {/* <Route exact path="/ranking" component={ RankingScreen } /> */}
      </Switch>
<<<<<<< HEAD
    </Router>    
=======
    </Router>
>>>>>>> 9b88e2b182cd03748e21a9b08189026a87e649b1
  );
}
