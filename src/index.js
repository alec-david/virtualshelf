import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import remembrApp from './reducers/index';

import NavigationBar from './containers/NavigationBar';

import './index.css';

const store = createStore(remembrApp);
console.log(store.getState());

render(
  <Provider store={store}>
    <NavigationBar />
  </Provider>,
  document.getElementById('root')
);
