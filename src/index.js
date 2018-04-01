import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './containers/bitmex';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import './styles/grid-styles.css'; /* eslint-disable-line */
import './styles/resizable-styles.css'; /* eslint-disable-line */

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
