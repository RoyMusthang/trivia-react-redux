import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendScore } from '../redux/actions';

class Options extends Component {
  constructor(props) {
    super(props);

    this.verifyCorrect = this.verifyCorrect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.verifyCorrect();
  }

  // verifyCorrect() {
  //   const { contador, chave } = this.props;
  //   if (contador === chave) {
  //     return this.setState({ isCorrect: true });
  //   }
  //   return this.setState({ isCorrect: false });
  // }

  pointer(target) {
    const { questions, contador, timer, updateScore } = this.props;
    const { difficulty } = questions[contador];
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
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  

  render() {
    const { questions, done } = this.props;
    const { correct_answer, incorrect_answers, type, category, question } = questions;
    console.log(questions)
    // const { isCorrect } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h3 data-testid="question-text">{question}</h3>
        <div className="answers">
          
          {
            questions.map((question) => {
              return (
              <button
                type="button"
                id="correct"
                onClick={ this.handleClick }
                data-testid="correct-answer"
                disabled={ done }
              >
                {correct_answer}
              </button>
              
            )})
          }
        </div>
      </div>
    );
    // if (isCorrect) {
    //   return (
    //     <button
    //       type="button"
    //       id="correct"
    //       onClick={ this.handleClick }
    //       data-testid="correct-answer"
    //       disabled={ done }
    //     >
    //       {questions[contador].correct_answer}
    //     </button>);
    // }
    // return (

    //   <button
    //     id="incorrect"
    //     type="button"
    //     onClick={ this.handleClick }
    //     data-testid={ `wrong-answer-${chave}` }
    //     disabled={ done }
    //   >
    //     {questions[contador].incorrect_answers[chave - 1]}
    //   </button>
    // );
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
