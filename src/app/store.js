import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';

import multi from 'redux-multi'

export default configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [multi, ...getDefaultMiddleware()]
});
