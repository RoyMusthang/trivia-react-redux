import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendScore } from '../redux/actions';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      arrayOptions: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.optionsFunc = this.optionsFunc.bind(this);
    this.disableFunc = this.disableFunc.bind(this);
  }

  componentDidMount() {
    this.optionsFunc();
  }

  componentDidUpdate(prevProp) {
    const { questionChosen, done } = this.props;
    if (questionChosen.question !== prevProp.questionChosen.question) {
      this.optionsFunc();
      this.disableFunc();
    }
    if (done !== prevProp.done) {
      this.disableFunc();
    }
  }

  disableFunc() {
    const { isDisabled } = this.state;
    this.setState({ isDisabled: !isDisabled });
  }

  pointer(target) {
    const { questionChosen, timer, updateScore } = this.props;
    const { difficulty } = questionChosen;
    if (target.id === 'correct') {
      const DEZ = 10;
      const lsData = JSON.parse(localStorage.getItem('state'));
      lsData.player.assertions += 1;
      const difficulties = ['bico de pato', 'easy', 'medium', 'hard'];
      const diffMultiplier = difficulties.indexOf(difficulty);
      lsData.player.score += DEZ + (timer * diffMultiplier);
      updateScore(({ score: lsData.player.score, assertions: lsData.player.assertions }));
    }
  }

  handleClick({ target }) {
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    const next = document.querySelector('#nextButton');
    correto.classList.add('correct');
    incorretos.forEach((incorreto) => incorreto.classList.add('incorrect'));
    next.classList.remove('nextDisabled');
    next.classList.add('next');
    this.pointer(target);
    correto.disabled = true;
    incorretos.forEach((incorreto) => { incorreto.disabled = true; });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  optionsFunc() {
    const { questionChosen, done } = this.props;
    const { isDisabled } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: inCorrectAnswer,
      question } = questionChosen;
    const btnCorrect = (
      <button
        key={ question }
        type="button"
        id="correct"
        onClick={ this.handleClick }
        data-testid="correct-answer"

      >
        {correctAnswer}
      </button>
    );
    const btnsIncorrect = (
      inCorrectAnswer.map((ques, i) => (
        <button
          key={ i }
          type="button"
          id="incorrect"
          onClick={ this.handleClick }
          data-testid={ `wrong-answer${i}` }

        >
          {ques}
        </button>
      )));

    const arr = [btnCorrect, ...btnsIncorrect];
    this.shuffleArray(arr);
    this.setState({ arrayOptions: arr });
  }

  render() {
    const { arrayOptions } = this.state;
    const { questionChosen } = this.props;
    const { category, question } = questionChosen;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        <div className="answers" />
        {arrayOptions}
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  score: state.pontuador.score,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (obj) => dispatch(sendScore(obj)),
});

Options.propTypes = {
  contador: PropTypes.number,
  questions: PropTypes.arrayOf(),
}.isRequired;
export default connect(mapsStateToProps, mapDispatchToProps)(Options);
