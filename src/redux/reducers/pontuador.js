import { SCORE_INFO } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const updateLocalStorage = (score) => {
  const state = JSON.parse(localStorage.getItem('state'));
  state.player.score = score;

  localStorage.setItem('state', JSON.stringify(state));
};

function pontuador(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE_INFO:
    updateLocalStorage(state.score + Number(action.payload.score));
    return { ...state,
      score: state.score + Number(action.payload.score),
      assertions: state.assertions + Number(action.payload.assertions) };
  default:
    return state;
  }
}
export default pontuador;
