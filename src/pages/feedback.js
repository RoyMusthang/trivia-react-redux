import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import { sendResetPontuation } from '../redux/actions';

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.renderFeedbackQuestion = this.renderFeedbackQuestion.bind(this);
  }

  handleClick({ target: { optButton } }) {
    const { history, resetStore } = this.props;
    if (optButton === 'Ver Ranking') {
      history.push('/ranking');
    } else {
      resetStore();
      history.push('/game');
    }
  }

  renderFeedbackQuestion() {
    const { assertions } = this.props;
    return <span data-testid="feedback-total-question">{assertions}</span>;
  }

  render() {
    const { correctAnswers, score } = this.props;
    const acertoBase = 3;

    return (
      <div>
        <Header />
        <section>
          <p data-testid="feedback-text">
            {correctAnswers >= acertoBase ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
          <span data-testid="feedback-total-score">
            {score}
          </span>
          <span data-testid="feedback-total-question">
            { this.renderFeedbackQuestion() }
          </span>
          <button
            type="button"
            dataTestId="btn-play-again"
            name="Jogar Novamente"
            onClick={ this.handleClick }
          >
            Jogar Novamente
          </button>
          <button
            type="button"
            dataTestId="btn-ranking"
            name="Ver Ranking"
            onClick={ this.handleClick }
          >
            Ver Ranking
          </button>
        </section>
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
  correctAnswers: PropTypes.oneOfType([
    PropTypes.number,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.pontuador.score,
  correctAnswers: state.pontuador.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(sendResetPontuation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
