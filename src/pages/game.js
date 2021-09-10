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
      timer: 30,
      contador: 0,
      questions: [],
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    // ENVIAR SCORE PARA REDUX E CRIAR CONTADOR DE ACERTOS E ENVIAR TAMBÉM PARA O REDUX
  }

  componentDidMount() {
    this.fetchQuestion();
    this.startCountdown();
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
    const next = document.querySelector('#nextButton');
    const { contador } = this.state;
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    this.setState({
      done: false,
      contador: contador + 1,
      timer: 30,
    });
    correto.classList.remove('correct');
    incorretos.forEach((incorreto) => incorreto.classList.remove('incorrect'));
    next.classList.remove('next');
    next.classList.add('nextDisabled');
  }

  startCountdown() {
    const ONE_SECOND = 1000;
    const updateState = () => {
      const next = document.querySelector('#nextButton');
      const { timer, done } = this.state;
      if (!done) {
        if (timer > 0) {
          this.setState((prevState) => ({ timer: prevState.timer - 1 }));
        } else {
          clearInterval(updateState);
          this.setState({ done: true });
          next.classList.add('next');
          next.classList.remove('nextDisabled');
        }
      } else {
        this.setState({ timer: 30 });
      }
    };
    setInterval(updateState, ONE_SECOND);
  }

  render() {
    const { contador, questions, timer, done } = this.state;
    if (!questions[contador]) return 'loading...';
    return (
      <div>
        {/* {console.log(questions[contador])} */}
        <Header />
        <Link to="/">Back</Link>
        <h2 data-testid="question-category">{questions[contador].category}</h2>
        <h3 data-testid="question-text">{questions[contador].question}</h3>
        <div className="answers">
          <Options
            questions={ questions }
            chave={ 0 }
            contador={ contador }
            done={ done }
          />
          <Options
            questions={ questions }
            chave={ 1 }
            contador={ contador }
            done={ done }
          />
          <Options
            questions={ questions }
            chave={ 2 }
            contador={ contador }
            done={ done }
          />
          <Options
            questions={ questions }
            chave={ 3 }
            contador={ contador }
            done={ done }
          />
        </div>
        <Timer timer={ timer } />
        <button
          className="nextDisabled"
          id="nextButton"
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-next"
        >
          Next
        </button>
      </div>
    );
  }
}

export default GameScreen;
