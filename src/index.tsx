import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './shared/assets/scss/vars.scss';
import './shared/assets/scss/app-base.scss';
import './shared/assets/scss/common.scss';
import './index.scss';
import './shared/http/jquery-setup';
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
