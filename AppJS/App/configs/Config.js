/** @format */

const APP_NAME = 'TOPENX';

const TOPENID = {
  title: 'TopenID',
  issuer: 'https://dev.citizen.com.vn',
  redirect_uri: 'mobilepoc://welcome',
  client_id: '7XyYkYJGrcbCAZq6FcZ397G8NuYa',
  client_secret: 'ffGYQvReWkI5kMdU0r1ysGpvn8wa',
  authorization_endpoint: 'https://dev.citizen.com.vn/oauth2/authorize',
  token_endpoint: 'https://dev.citizen.com.vn/oauth2/token',
  code_challenge_method: 'S256',
  response_type: 'code',
  scope: 'openid profile',
  grant_type: 'authorization_code',
  logout_endpoint: 'https://dev.citizen.com.vn/oidc/logout',
  redirect_logout: 'mobilepoc://logout',
};

export const Config = {
  APP_NAME,
  TOPENID,
};
