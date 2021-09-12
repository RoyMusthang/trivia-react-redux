import { combineReducers } from 'redux';
import pontuador from './pontuador';
import questionador from './question';

const rootreducer = combineReducers({ pontuador, questionador });

export default rootreducer;
