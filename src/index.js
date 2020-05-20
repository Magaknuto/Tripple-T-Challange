import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

import './custom.scss';
import './index.css';

import { play, checkSectionWinner, switchPlayer, calculateAvailableMoves } from './features/game/gameActions'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// store.dispatch(play(1, 0, 'x'));
// store.dispatch(play(1, 1, 'x'));
// store.dispatch(play(1, 2, 'x'));
// store.dispatch(checkSectionWinner(1));