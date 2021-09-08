import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.createGravatar = this.createGravatar.bind(this);
  }

  createGravatar(info) {
    const gravatar = md5(info.toString());
    return gravatar;
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.createGravatar(player.gravatarEmail)}` }
          alt="Avatar do Usuário"
        />
        <h3
          data-testid="header-player-name"
        >
          { player.name }
        </h3>
        <p data-testid="header-score">{player.score}</p>
      </header>
    );
  }
}

export default Header;
