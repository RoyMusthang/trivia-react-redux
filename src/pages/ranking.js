import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Redirect, Link } from 'react-router-dom';

class RankingScreen extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.getInfo = this.getInfo.bind(this);
    this.createGravatar = this.createGravatar.bind(this);
    this.createLi = this.createLi.bind(this);
  }

  getInfo(key) {
    const localGet = JSON.parse(localStorage.getItem('state'));
    const { player } = localGet;
    return player[key];
  }

  createGravatar() {
    const gravatar = md5(this.getInfo('gravatarEmail').toString());
    return gravatar;
  }

  createLi() {
    return (
      <li className="ranking-person ">
        <img
          // data-testid={ `player-name-${index}` }
          src={ `https://www.gravatar.com/avatar/${this.createGravatar}` }
          alt="Avatar do Usuário"
        />
        <h3>
          { this.getInfo('name')}
        </h3>
        <h3>
          { this.getInfo('score')}
        </h3>
        {this.rankStorage}
      </li>);
  }

  rankStorage() {
    const { name, score, picture } = JSON.parse(localStorage.getItem('ranking'));
    const newEntries = { name, score, picture };
    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking)
      const newRanking = [...ranking, newEntries];
      newRanking.sort((a, b) => b.score - a.score);
      const ranking = JSON.stringfy(localStorage.setItem('ranking', newRanking));
      this.setState({
        ranking: newRanking,
      });
    } else {
      const newRanking = [newEntries];
      JSON.stringfy(localStorage.setItem('ranking', newRanking));
      this.setState({
        ranking: newRanking,
      });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        { ranking.map((player, indexPlayer) => (
          <div
            key={ indexPlayer }
          >
            <img src={ player.picture } alt="foto da pessoa" />
            <h3 data-testid={ `player-name-${indexPlayer}` }>{ player.name }</h3>
            <h3 data-testid={ `player-score-${indexPlayer}` }>{ player.score }</h3>
          </div>
        ))}
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
