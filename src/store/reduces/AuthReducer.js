import { SIGN_IN, SIGN_OUT, PROFILE } from '../types';

const initialState = {
  userToken: '',
  profile: {
      name: '',
      lastName: '',
      email: '',
      photo: ''
  }
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        userToken: '',
      };
    case PROFILE:
      return {
          ...state,
          profile: action.data,
      };
    default:
      return state;
  }
};

export default AuthReducer;
