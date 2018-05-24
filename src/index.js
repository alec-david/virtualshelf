import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReduxToastr from 'react-redux-toastr';

import remembrApp from './reducers/index';
import App from './containers/App';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(remembrApp);

const containerStyle = {
  backgroundColor: '#F8F8F8'
};

render(
  <Provider store={store}>
    <div style={containerStyle}>
      <ReduxToastr
        position="top-center"
        timeOut={3000}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
