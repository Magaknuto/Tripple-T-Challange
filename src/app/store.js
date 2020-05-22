import { configureStore, getDefaultMiddleware, createNextState } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';

import AiPlay from '../features/game/MonteCarlo/index'

import multi from 'redux-multi'

const AIMiddleware = store => next => action => {
  next(action)
  if (action.payload.caller === 'player') {
    return AiPlay(store)
  }

}

export default configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [AIMiddleware, multi, ...getDefaultMiddleware()]
});
