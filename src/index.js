import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReduxToastr from 'react-redux-toastr'

import remembrApp from './reducers/index';
import App from './containers/App';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(remembrApp);
console.log(store.getState());

render(
  <Provider store={store}>
    <div>
      <ReduxToastr
        position='top-center'
        timeOut={4000}
        transitionIn='fadeIn'
        transitionOut='fadeOut'
      />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
