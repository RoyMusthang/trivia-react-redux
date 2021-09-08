import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.createGravatar = this.createGravatar.bind(this);
  }

  createGravatar() {
    const gravatar = md5(this.getInfo('gravatarEmail').toString());
    return gravatar;
  }

  render() {
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const { player: { name } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.createGravatar}` }
          alt="Avatar do Usuário"
        />
        <h3
          data-testid="header-player-name"
        >
          { name }
        </h3>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

export default Header;
