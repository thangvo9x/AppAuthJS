/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import Reactotron from 'reactotron-react-native';
import { persistReducer, persistStore } from 'redux-persist';

import { Constants, connectConsoleToReactotron, AppRNConfig } from 'configs';
import reducers from 'reducers';

const midlewares = [];
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, reducers);

let store = null;
if (__DEV__) {
  if (Constants.USE_REACTOTRON) {
    store = createStore(
      persistedReducer,
      {},
      compose(applyMiddleware(...midlewares), Reactotron.createEnhancer())
    );
    connectConsoleToReactotron();
  } else {
    AppRNConfig.REDUX_LOGGER === '1' && midlewares.push(logger);
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = composeEnhancers(applyMiddleware(...midlewares))(createStore)(
      persistedReducer
    );

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(persistedReducer, () => {
        const nextRootReducer = persistedReducer;
        store.replaceReducer(nextRootReducer);
      });
    }

    // show network react-native-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest;
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData;
  }
} else {
  store = compose(applyMiddleware(...midlewares))(createStore)(
    persistedReducer
  );

  // Remove console
  console.log = function () {};
  console.info = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.debug = function () {};
}

let rehydrationComplete;
export function rehydration() {
  return new Promise((resolve, reject) => {
    rehydrationComplete = resolve;
  });
}
persistStore(store, {}, () => {
  // timeout for waiting reducer update
  setTimeout(() => rehydrationComplete?.(), 10);
});

export default store;
