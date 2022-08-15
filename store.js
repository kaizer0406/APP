import { createStore, combineReducers } from 'redux';
import AuthReducer from './src/store/reduces/AuthReducer';
import LevelReducer from './src/store/reduces/LevelReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  level: LevelReducer 
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
