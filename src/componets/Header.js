import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.getInfo = this.getInfo.bind(this);
    this.createGravatar = this.createGravatar.bind(this);
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

  render() {
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
          { this.getInfo('name')}
        </h3>
        <p
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

export default Header;
