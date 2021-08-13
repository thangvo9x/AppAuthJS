/** @format */

// import { deleteDefaultAuthToken } from 'utils/Utils';
import { LOGOUT, LOGIN_PHONE, SET_STATE_STATUS } from '../actions/auth';
import jwt_decode from 'jwt-decode';

const initialState = {
  errorMsg: '',

  isLoggedIn: false,
  account: {
    token: '',
    idToken: '',
    user: {},
    state: '',
  },
  isLoggingIn: false,
};

export default (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case LOGOUT:
      // deleteDefaultAuthToken();
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
          idToken: data.id_token,
        },
      };
    case SET_STATE_STATUS.SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          state: data,
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
