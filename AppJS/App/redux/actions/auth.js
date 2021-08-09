import { createRequestTypes } from './utils';

export const LOGIN_PHONE = createRequestTypes('LOGIN_PHONE');
export const loginPhone = (params) => ({ type: LOGIN_PHONE.REQUEST, params });
export const loginPhoneSuccess = (data) => ({
  type: LOGIN_PHONE.SUCCESS,
  data,
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });
