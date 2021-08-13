/** @format */

import Reactotron from 'reactotron-react-native';

import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

Reactotron.configure({ name: 'TopenX' }) // controls connection & communication settings
  .useReactNative()
  .use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}
