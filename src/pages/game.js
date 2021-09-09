import React from 'react';
import { Link } from 'react-router-dom';
import Options from '../componets/Options';
import Header from '../componets/Header';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 0,
      questions: [],
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
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

  render() {
    const { contador, questions } = this.state;
    if (!questions[contador]) return 'loading...';
    return (
      <div>
        <Header />
        <Link to="/">Back</Link>
        <h2 data-testid="question-category">{questions[contador].category}</h2>
        <h3 data-testid="question-text">{questions[contador].question}</h3>
        <form>
          <Options questions={ questions } chave={ 0 } contador={ contador } />
          <Options questions={ questions } chave={ 1 } contador={ contador } />
          <Options questions={ questions } chave={ 2 } contador={ contador } />
          <Options questions={ questions } chave={ 3 } contador={ contador } />
        </form>
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
