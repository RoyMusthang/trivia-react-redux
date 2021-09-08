import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { optButton } }) {
    const { history } = this.props;
    if (optButton === 'Ver Ranking') {
      history.push('/ranking');
    } else {
      history.push('/GameScreen');
    }
  }

  render() {
    const { correctAnswers, score } = this.props;
    const acertoBase = 3;

    return (
      <div>
        <Header />
        <section>
          <p data-testid="feedback-text">
            {correctAnswers >= acertoBase ? 'Mandou bem!' : 'Poderia ser melhor...'}
          </p>
          <p data-testid="feedback-total-question">
            {`Você acertou ${correctAnswers} questões de 5`}
          </p>
          <p data-testid="feedback-total-score">
            {`Você marcou ${score} pontos no total!`}
          </p>
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
    PropTypes.string,
  ]).isRequired,
  correctAnswers: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.results.score,
  correctAnswers: state.results.correctAnswers,
});

export default connect(mapStateToProps, null)(FeedbackScreen);
