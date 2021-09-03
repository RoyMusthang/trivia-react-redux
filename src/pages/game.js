import React from 'react';
import { Link } from 'react-router-dom';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 0,
      token: '',
      questions: {
        results: [{
          category: '',
          correct_answer: '',
          incorrect_answers: [''],
        }],
      },
    };
    this.apiQuestion = this.apiQuestion.bind(this);
    this.getToken = this.getToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  getToken() {
    const tokenGet = localStorage.getItem(('token'));
    this.setState({
      token: tokenGet,
    });
  }

  handleClick() {
    const { contador } = this.state;
    this.setState = ({
      contador: contador + 1,
    });
  }

  async apiQuestion() {
    const { token } = this.state;
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = fetchQuestions.json();
    this.setState({ questions });
  }

  render() {
    const { contador, questions: { results } } = this.state;
    return (
      <div>
        <Link to="/">Back</Link>
        <h2 data-testid="question-category">{ results[contador].category }</h2>
        <p data-testid="question-text">{ results[contador].question }</p>
        <button
          type="button"
          onClick={ this.handleClick() }
        >
          Next
        </button>
      </div>
    );
  }
}

export default GameScreen;
