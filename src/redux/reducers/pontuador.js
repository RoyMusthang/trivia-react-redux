import { SCORE_INFO, SET_DONE, SET_RESET } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  done: false,
};

const updateLocalStorageScore = (score) => {
  const state = JSON.parse(localStorage.getItem('state'));
  state.player.score = score;

  localStorage.setItem('state', JSON.stringify(state));
};

const updateLocalStorageAssertions = (assertions) => {
  const state = JSON.parse(localStorage.getItem('state'));
  state.player.assertions = assertions;

  localStorage.setItem('state', JSON.stringify(state));
};

function pontuador(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE_INFO:
    updateLocalStorageScore(state.score + Number(action.payload.score));
    updateLocalStorageAssertions(state.assertions + Number(action.payload.assertions));
    return { ...state,
      score: state.score + Number(action.payload.score),
      assertions: state.assertions + Number(action.payload.assertions) };
  case SET_DONE:
    return { ...state, done: action.payload };
  case SET_RESET:
    return { ...state, score: 0, assertions: 0 };
  default:
    return state;
  }
}
export default pontuador;
