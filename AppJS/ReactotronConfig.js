/** @format */

import Reactotron from 'reactotron-react-native';

import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

Reactotron.configure({
  name: 'TopenX',
  host: '192.168.0.111',
})
  .useReactNative()
  .use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}
