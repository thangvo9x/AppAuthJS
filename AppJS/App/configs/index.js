/** @format */

import AppRNConfig from 'react-native-config';
import Images from './Images';
import { Colors } from './Colors';
import { Constants } from './Constants';
import { Config } from './Config';

import reactotron from 'reactotron-react-native';
const log = (values) => __DEV__ && reactotron.log(values);
const warn = (values) => __DEV__ && reactotron.warn(values);
const error = (values) => __DEV__ && reactotron.error(values);
function connectConsoleToReactotron() {
  console.log = log;
  console.warn = warn;
  console.error = error;
}

export {
  connectConsoleToReactotron,
  AppRNConfig,
  Constants,
  Colors,
  Images,
  Config,
};
