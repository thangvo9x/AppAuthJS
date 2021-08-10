import React from 'react';

import { Provider } from 'react-redux';
import './ReactotronConfig';
import store from './App/redux/store';

import AppWithNavigationState from 'navigations';

const App = () => {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
};

export default App;
