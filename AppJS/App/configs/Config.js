const APP_NAME = 'TOPENX';

const TOPENID = {
  title: 'TopenID',
  // issuer: "https://dev.citizen.com.vn",
  redirect_uri: 'mobilepoc://welcome',
  client_id: '7XyYkYJGrcbCAZq6FcZ397G8NuYa', // The Application ID of your Application Registration
  client_secret: 'ffGYQvReWkI5kMdU0r1ysGpvn8wa',
  authorization_endpoint: 'https://dev.citizen.com.vn/oauth2/authorize',
  token_endpoint: 'https://dev.citizen.com.vn/oauth2/token',
  code_challenge_method: 'S256',
  response_type: 'code',
  scope: 'openid profile',
  grant_type: 'authorization_code',
};

const IDENTITY_SERVER = {
  issuer: 'https://demo.identityserver.io',
  clientId: 'interactive.public',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  additionalParameters: {},

  // serviceConfiguration: {
  //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
  //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
  //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
  // }
};

export const Config = {
  APP_NAME,
  TOPENID,
  IDENTITY_SERVER,
};
