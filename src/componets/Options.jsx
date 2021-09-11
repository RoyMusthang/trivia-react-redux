import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendScore } from '../redux/actions';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOptions: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.optionsFunc = this.optionsFunc.bind(this);
  }

  // verifyCorrect() {
  //   const { contador, chave } = this.props;
  //   if (contador === chave) {
  //     return this.setState({ isCorrect: true });
  //   }
  //   return this.setState({ isCorrect: false });
  // }

  componentDidMount() {
    this.optionsFunc();
  }

  componentDidUpdate(prevProp) {
    const { questionChosen } = this.props;
    if (questionChosen.question !== prevProp.questionChosen.question) {
      this.optionsFunc();
    }
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
    const { changeDone } = this.props;
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    const next = document.querySelector('#nextButton');
    correto.classList.add('correct');
    incorretos.forEach((incorreto) => incorreto.classList.add('incorrect'));
    next.classList.remove('nextDisabled');
    next.classList.add('next');
    this.pointer(target);
    changeDone();
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
        disabled={ done }
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
          disabled={ done }
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
