import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App name='dy' age={23} />, document.getElementById('root'));
