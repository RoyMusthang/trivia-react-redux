export const SCORE_INFO = 'SCORE_INFO';
export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_DONE = 'SET_DONE';
export const SET_RESET = 'SET_RESET';
export const SET_CONTADOR = 'SET_CONTADOR';
// na

export const sendScore = (payload) => ({
  type: SCORE_INFO,
  payload,
});

export const setOptions = (payload) => ({
  type: SET_OPTIONS,
  payload,
});

export const sendDone = (payload) => ({
  type: SET_DONE,
  payload,
});

export const sendResetPontuation = (payload) => ({
  type: SET_RESET,
  payload,
});
