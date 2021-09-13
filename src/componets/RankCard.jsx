import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// jnoafsdjfsadńko]npk

class RankCard extends Component {
  constructor() {
    super();
    this.state = {
      playersState: [],
    };
    /* this.createGravatar = this.createGravatar.bind(this); */
    this.sortPlayers = this.sortPlayers.bind(this);
  }

  /*  createGravatar(info) {
    const gravatar = md5(info.toString());
    return gravatar;
  } */

  componentDidMount() {
    this.sortPlayers();
  }

  updateLocalStorage() {
    const { score } = this.props;
    const state = localStorage.getItem('state');
    let scoreString = state.split('score')[1];
    scoreString = score;
    const stateSplit = state.split('score')[0] + scoreString;
    localStorage.setItem('state', stateSplit);
  }

  /* createPicture(player) {
    return `https://www.gravatar.com/avatar/${this.createGravatar(player.gravatarEmail)}`;
  }
 */

  sortPlayers() {
    const { players } = this.props;
    const MENOS_UM = -1;
    players.sort((a, b) => {
      if (a.score > b.score) {
        return MENOS_UM;
      }
      if (a.score < b.score) {
        return 1;
      }

      return 0;
    });
    this.setState({ playersState: players });
  }

  render() {
    const { playersState } = this.state;

    return (
      <div>
        {playersState.map((player, index) => (
          <header key={ player }>
            <img
              data-testid="header-profile-picture"
              src={ player.picture }
              alt="Avatar do Usuário"
            />
            <h3
              data-testid={ `player-name-${index}` }
            >
              { player.name }
            </h3>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </header>))}
      </div>
    );
  }
}

RankCard.propTypes = {
  player: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  players: state.pontuador.players,
});

export default connect(mapStateToProps)(RankCard);
