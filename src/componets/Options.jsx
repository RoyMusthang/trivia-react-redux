import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  constructor() {
    super();
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle() {
    const { questions, contador } = this.props;
    const array = [
      <option
        key="1"
        data-testid="correct-answer"
      >
        {questions[contador].correct_answer}
      </option>,
      <option
        key="2"
        data-testid={ `wrong-answer-${0}` }
      >
        {questions[contador].incorrect_answers[0]}
      </option>,
      <option
        key="3"
        data-testid={ `wrong-answer-${1}` }
      >
        {questions[contador].incorrect_answers[1]}
      </option>,
      <option
        key="4"
        data-testid={ `wrong-answer-${2}` }
      >
        {questions[contador].incorrect_answers[2]}
      </option>,
      <option
        key="5"
        data-testid={ `wrong-answer-${2 + 1}` }
      >
        {questions[contador].incorrect_answers[3]}
      </option>,
    ];
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  render() {
    return <select>{this.shuffle()}</select>;
  }
}

Options.propTypes = {
  contador: PropTypes.number,
  questions: PropTypes.arrayOf(),
}.isRequired;
export default Options;
