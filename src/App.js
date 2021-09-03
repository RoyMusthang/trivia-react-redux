import React from 'react';
// import logo from './trivia.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginScreen from './pages/login';
import ConfigScreen from './pages/config';
import GameScreen from './pages/game';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        <Route exact path="/game" component={ GameScreen } />
        <Route exact path="/config" component={ ConfigScreen } />
        {/* <Route exact path="/feedback" component={ FeedbackScreen } /> */}
        {/* <Route exact path="/ranking" component={ RankingScreen } /> */}
      </Switch>
    </Router>
  );
}
