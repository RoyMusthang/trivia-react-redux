import { SET_OPTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function questionador(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_OPTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}
export default questionador;
