import React from 'react';
import { Link } from 'react-router-dom';
import Options from '../componets/Options';
import Header from '../componets/Header';
import Timer from '../componets/Timer';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      done: false,
      timer: 10,
      contador: 0,
      questions: [],
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timerClock = this.timerClock.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
    this.timerClock();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const ZERO_SECOND = 0;
    if (timer < ZERO_SECOND) {
      this.resetCronometer();
    }
  }

  async fetchQuestion() {
    const tokenGet = localStorage.getItem(('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenGet}`);
    const questionsApi = await fetchQuestions.json();
    const questionJson = await questionsApi.results;
    localStorage.setItem('questions', JSON.stringify(questionJson));
    this.setState({ questions: questionJson });
  }

  handleClick() {
    const { contador } = this.state;
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    this.setState({
      contador: contador + 1,
    });
    correto.classList.remove('correct');
    incorretos.forEach((incorreto) => incorreto.classList.remove('incorrect'));
  }

  timerClock() {
    const { done } = this.state;
    const ONE_SECOND = 1000;
    if (!done) {
      setInterval(() => {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }, ONE_SECOND);
    }
  }

  resetCronometer() {
    clearInterval(this.timerClock);
  }

  render() {
    const { contador, questions, timer } = this.state;
    if (!questions[contador]) return 'loading...';
    return (
      <div>
        <Header />
        <Link to="/">Back</Link>
        <h2 data-testid="question-category">{questions[contador].category}</h2>
        <h3 data-testid="question-text">{questions[contador].question}</h3>
        <div className="answers">
          <Options questions={ questions } chave={ 0 } contador={ contador } />
          <Options questions={ questions } chave={ 1 } contador={ contador } />
          <Options questions={ questions } chave={ 2 } contador={ contador } />
          <Options questions={ questions } chave={ 3 } contador={ contador } />
        </div>

        <Timer timer={ timer } />

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Next
        </button>
      </div>
    );
  }
}

export default GameScreen;
