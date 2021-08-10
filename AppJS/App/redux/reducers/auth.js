// import { deleteDefaultAuthToken } from 'utils/Utils';
import { LOGOUT, LOGIN_PHONE } from '../actions/auth';
import jwt_decode from 'jwt-decode';

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
  const { data } = action;
  switch (action.type) {
    case LOGOUT:
      //   deleteDefaultAuthToken();
      return { ...initialState };

    case LOGIN_PHONE.REQUEST:
      return { ...state, isLoggedIn: false, isLoggingIn: true };

    case LOGIN_PHONE.SUCCESS:
      let userInfo = '';
      if (data.id_token) {
        userInfo = jwt_decode(data.id_token);
      }
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        account: {
          ...state.account,
          user: userInfo,
          token: data.access_token,
        },
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
