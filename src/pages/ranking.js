import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendResetPontuation, setRanking } from '../redux/actions';
import RankCard from '../componets/RankCard';

class RankingScreen extends Component {
  constructor() {
    super();
    this.resetLocal = this.resetLocal.bind(this);
  }

  resetLocal() {
    const { resetStore } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = 0;
    state.player.assertions = 0;
    localStorage.setItem('state', JSON.stringify(state));
    resetStore();
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RankCard />
        <Link to="/">
          <button onClick={ this.resetLocal } type="button" data-testid="btn-go-home">
            Tela Inicial
          </button>
        </Link>
      </div>
    );
  }
}

RankingScreen.propTypes = {
  resetStore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.pontuador.players,
});

const mapDispatchToProps = (dispatch) => ({
  setRank: (payload) => dispatch(setRanking(payload)),
  resetStore: () => dispatch(sendResetPontuation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankingScreen);
