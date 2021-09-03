import React from 'react';
import { Link } from 'react-router-dom';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',
      contador: 0,
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
    const questionFilter = fetchQuestions.json();
    return questionFilter.results;
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <div data-testid="question-category">
          <h1>
            { this.apiQuestion().question }
          </h1>
          <button type="button">
            { this.apiQuestion().correct_answer }
          </button>
          {/* { this.apiQuestion().incorrect_answers.map((item, index) => (<button type="button" key={ index }>{ item }</button>
          ))} */}
        </div>
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
