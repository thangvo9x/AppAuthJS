/** @format */

import { createRequestTypes } from './utils';

export const LOGIN_PHONE = createRequestTypes('LOGIN_PHONE');

export const loginPhone = (params) => ({ type: LOGIN_PHONE.REQUEST, params });
export const loginPhoneSuccess = (data) => ({
  type: LOGIN_PHONE.SUCCESS,
  data,
});

export const SET_STATE_STATUS = createRequestTypes('SET_STATE_STATUS');
export const saveStateStatus = (state) => ({
  type: SET_STATE_STATUS.SUCCESS,
  data: state,
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });
