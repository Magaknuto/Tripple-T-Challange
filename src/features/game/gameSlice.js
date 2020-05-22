import { createReducer } from '@reduxjs/toolkit'
import makeMove from './gameActions'
import { playMove } from './utils'

const board = {
    sections: Array(9).fill({ winner: null, squares: Array(9).fill(null) }),
    sectionToPlay: 9,
}

const initialState = {
    isTurnX: true,
    opponent: 'NoName',
    board,
}

const gameReducer = createReducer(
    initialState,
    {
        [makeMove]: (state, action) => {
            return {
                ...state,
                isTurnX: !state.isTurnX,
                board: playMove(state.board, action.payload.sectionId, action.payload.buttonId, action.payload.player),
            }
        }
    }
)


export default gameReducer