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
    localStorage.setItem('questions', JSON.stringify(questionsApi.results));
    this.setState({ questions: questionsApi.results });
  }

  handleClick() {
    const { contador } = this.state;
    this.setState({
      contador: contador + 1,
    });
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
        <select>
          <Options questions={ questions } chave={ 0 } contador={ contador } />
          <Options questions={ questions } chave={ 1 } contador={ contador } />
          <Options questions={ questions } chave={ 2 } contador={ contador } />
          <Options questions={ questions } chave={ 3 } contador={ contador } />
        </select>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Next
        </button>
      </div>
    );
  }
}

export default GameScreen;
