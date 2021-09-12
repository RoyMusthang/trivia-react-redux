import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendDone, setOptions } from '../redux/actions';
import Options from '../componets/Options';
import Header from '../componets/Header';
import Timer from '../componets/Timer';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 0,
      done: false,
      timer: 30,
      quatro: 4,
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.changeDone = this.changeDone.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
    this.startCountdown();
    this.resetLocal();
  }

  resetLocal() {
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = 0;
    state.player.assertions = 0;
    localStorage.setItem('state', JSON.stringify(state));
  }

  async fetchQuestion() {
    const { setOption } = this.props;
    const tokenGet = localStorage.getItem(('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenGet}`);
    const questionsApi = await fetchQuestions.json();
    const questionJson = await questionsApi.results;
    localStorage.setItem('questions', JSON.stringify(questionJson));
    setOption(questionJson);
  }

  handleClick() {
    const { history } = this.props;
    const { contador, quatro } = this.state;
    if (contador < quatro) {
      const next = document.querySelector('#nextButton');
      const correto = document.querySelector('#correct');
      const incorretos = document.querySelectorAll('#incorrect');
      this.setState({ done: false, contador: contador + 1, timer: 30 });
      correto.classList.remove('correct');
      correto.disabled = false;
      incorretos.forEach((incorreto) => incorreto.classList.remove('incorrect'));
      incorretos.forEach((incorreto) => { incorreto.disabled = false; });
      next.classList.remove('next');
      next.classList.add('nextDisabled');
    } else {
      history.push('/feedback');
    }
  }

  startCountdown() {
    const ONE_SECOND = 1000;
    const updateState = () => {
      const next = document.querySelector('#nextButton');
      const { timer, done } = this.state;
      if (!done) {
        const incorretos = document.querySelectorAll('#incorrect');
        const correto = document.querySelector('#correct');
        if (timer > 0) {
          this.setState((prevState) => ({ timer: prevState.timer - 1 }));
        } else {
          clearInterval(updateState);
          this.changeDone();
          correto.disabled = true;
          incorretos.forEach((incorreto) => { incorreto.disabled = true; });
          next.classList.add('next');
          next.classList.remove('nextDisabled');
        }
      } else {
        this.setState({ timer: 30 });
      }
    };
    setInterval(updateState, ONE_SECOND);
  }

  changeDone() {
    const { done } = this.state;
    const { setDone } = this.props;
    this.setState({ done: !done });
    setDone(done);
  }

  render() {
    const { questions } = this.props;
    const { timer, done, contador } = this.state;
    if (questions.length === 0) {
      return <p>loading...</p>;
    }
    return (
      <div>
        <div>
          <Header />
          <Link to="/">Back</Link>
          <Options
            timer={ timer }
            changeDone={ this.changeDone }
            done={ done }
            questionChosen={ questions[contador] }
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

GameScreen.propTypes = {
  questions: PropTypes.any,
  setOption: PropTypes.func,
}.isRequired;

const mapsStateToProps = (state) => ({
  questions: state.questionador.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setOption: (payload) => dispatch(setOptions(payload)),
  setDone: (done) => dispatch(sendDone(done)),
});

export default connect(mapsStateToProps, mapDispatchToProps)(GameScreen);
