import { LOGIN_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
  nickName: '',
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INFO:
    return { ...state, email: action.payload.email, nickName: action.payload.nickname };
  default:
    return state;
  }
}
export default reducer;
