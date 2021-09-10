import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.createGravatar = this.createGravatar.bind(this);
  }

  createGravatar(info) {
    const gravatar = md5(info.toString());
    return gravatar;
  }

  updateLocalStorage() {
    const { score } = this.props;
    const state = localStorage.getItem('state');
    let scoreString = state.split('score')[1];
    scoreString = score;
    const stateSplit = state.split('score')[0] + scoreString;
    localStorage.setItem('state', stateSplit);
  }

  render() {
    const { player } = JSON.parse(localStorage.state);
    const { score } = this.props;
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
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.pontuador.score,
});

export default connect(mapStateToProps)(Header);
