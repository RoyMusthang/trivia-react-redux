import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrect: false,
    };
    this.verifyCorrect = this.verifyCorrect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.verifyCorrect();
  }

  verifyCorrect() {
    const { contador, chave } = this.props;
    if (contador === chave) {
      return this.setState({ isCorrect: true });
    }
    return this.setState({ isCorrect: false });
  }

  checkTrue() {

  }

  handleClick() {
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    const next = document.querySelector('#nextButton');
    correto.classList.add('correct');
    incorretos.forEach((incorreto) => incorreto.classList.add('incorrect'));
    next.classList.remove('nextDisabled');
    next.classList.add('next');
  }

  render() {
    const { contador, questions, chave, done } = this.props;
    const { isCorrect } = this.state;
    if (isCorrect) {
      return (
        <button
          type="button"
          id="correct"
          onClick={ this.handleClick }
          data-testid="correct-answer"
          disabled={ done }
        >
          {questions[contador].correct_answer}
        </button>);
    }
    return (
      <button
        id="incorrect"
        type="button"
        onClick={ this.handleClick }
        data-testid={ `wrong-answer-${chave}` }
        disabled={ done }
      >
        {questions[contador].incorrect_answers[chave - 1]}
      </button>
    );
  }
}

Options.propTypes = {
  contador: PropTypes.number,
  questions: PropTypes.arrayOf(),
}.isRequired;
export default Options;
