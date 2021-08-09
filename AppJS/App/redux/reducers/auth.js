// import { deleteDefaultAuthToken } from 'utils/Utils';
import { LOGOUT, LOGIN_PHONE } from '../actions/auth';

const initialState = {
  errorMsg: '',

  isLoggedIn: false,
  account: {
    token: '',
    user: {},
  },
  isLoggingIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      //   deleteDefaultAuthToken();
      return { ...initialState };

    case LOGIN_PHONE.REQUEST:
      return { ...state, isLoggedIn: false, isLoggingIn: true };

    case LOGIN_PHONE.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        account: action.data || action.params,
      };

    case LOGIN_PHONE.FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        errorMsg: action.result.message,
      };

    default:
      return state;
  }
};
