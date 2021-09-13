import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import { setRanking } from '../redux/actions';

class RankingScreen extends Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    setRanking(ranking);
  }

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

const mapDispatchToProps = (dispatch) => ({
  setRanking: (payload) => dispatch(setRanking(payload)),
});

export default connect(null, mapDispatchToProps)(RankingScreen);
