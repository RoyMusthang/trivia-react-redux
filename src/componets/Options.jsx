import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  constructor() {
    super();
    this.state = {
      isCorrect: false,
    };
    this.verifyCorrect = this.verifyCorrect.bind(this);
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

  render() {
    const { contador, questions, chave } = this.props;
    const { isCorrect } = this.state;
    if (isCorrect) {
      return (
        <option data-testid="correct-answer">
          {questions[contador].correct_answer}
        </option>);
    }
    return (
      <option
        data-testid={ `wrong-answer-${chave}` }
      >
        {questions[contador].incorrect_answers[chave - 1]}
      </option>
    );
  }
}

Options.propTypes = {
  contador: PropTypes.number,
  questions: PropTypes.arrayOf(),
}.isRequired;
export default Options;
