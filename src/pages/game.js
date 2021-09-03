import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';

class GameScreen extends React.Component {
  componentDidMount() {
    const token = 'token';
    const tokenGet = localStorage.getItem((token));
    return tokenGet;
  }

  render() {
    return (
      <div>
        <Header />
        <Link to="/">Back</Link>
      </div>

    );
  }
}

export default GameScreen;
