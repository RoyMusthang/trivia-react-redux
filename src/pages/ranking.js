import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';

class RankingScreen extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Header />
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Tela Inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default RankingScreen;
