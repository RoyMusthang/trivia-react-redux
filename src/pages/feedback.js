import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import { sendResetPontuation } from '../redux/actions';

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { history, resetStore } = this.props;
    if (target.name === 'Ver Ranking') {
      history.push('/ranking');
    } else {
      resetStore();
      history.push('/');
    }
  }

  render() {
    const { assertions, score } = this.props;
    const acertoBase = 3;

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions > acertoBase ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <div data-testid="feedback-total-score">
          {score}
        </div>
        <div data-testid="feedback-total-question">
          {assertions}
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          name="Jogar Novamente"
          onClick={ this.handleClick }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          name="Ver Ranking"
          onClick={ this.handleClick }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

FeedbackScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.oneOfType([
    PropTypes.number,
  ]).isRequired,
  assertions: PropTypes.oneOfType([
    PropTypes.number,
  ]).isRequired,
  resetStore: PropTypes.oneOfType([
    PropTypes.func.isRequired,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.pontuador.score,
  assertions: state.pontuador.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(sendResetPontuation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
