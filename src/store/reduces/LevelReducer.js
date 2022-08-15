import { SAVE_LEVEL } from '../types';

const initialState = {
    level: {}
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LEVEL:
      return {
        ...state,
        level: action.level,
      };
    default:
      return state;
  }
};

export default AuthReducer;
