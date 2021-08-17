import React from 'react';
import { DevSettings } from 'react-native';
import { Provider } from 'react-redux';
import './ReactotronConfig';
import store from './App/redux/store';
import Config from 'react-native-config';
import AppWithNavigationState from 'navigations';

import * as Sentry from '@sentry/react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosDebugger } from 'utils';
import SplashScreen from 'react-native-splash-screen';

Sentry.init({
  dsn:
    'https://faad7bc6805e481ab1b19c91a10ca19c@o952119.ingest.sentry.io/5901383',
  environment: Config.ENVIRONMENT,
  debug: Config.ENVIRONMENT !== 'PRODUCTION',
  release: 'TopenX@' + Config.VERSION,
});

const App = () => {
  axiosDebugger();
  useEffect(() => {
    DevSettings.addMenuItem('Clear Storage', async () => {
      await AsyncStorage.clear();
    });
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
};

export default App;
