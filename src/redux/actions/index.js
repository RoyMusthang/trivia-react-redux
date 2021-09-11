export const SCORE_INFO = 'SCORE_INFO';
export const SET_OPTIONS =  'SET_OPTIONS'

export const sendScore = (payload) => ({
  type: SCORE_INFO,
  payload,
});

export const setOptions = (payload) => ({
  type: SET_OPTIONS,
  payload,
});
