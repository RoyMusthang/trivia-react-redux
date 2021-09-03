import React from 'react';
import { Link } from 'react-router-dom';

class GameScreen extends React.Component {
  componentDidMount() {
    const token = 'token';
    const tokenGet = localStorage.getItem((token));
    return tokenGet;
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
      </div>

    );
  }
}

export default GameScreen;
