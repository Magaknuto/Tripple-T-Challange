import { createReducer } from '@reduxjs/toolkit'
import { play, checkSectionWinner, switchPlayer, calculateAvailableMoves } from './gameActions'
import R, { calculateWinner, countFinishedFields } from './utils'


const initialState = {
    toPlay: 9,
    winner: null,
    isTurnX: true,
    opponent: 'NoName',
    sections: Array(9).fill({ winner: null, squares: Array(9).fill(null) }),
}

const sectionsPath = () => R.lensPath(['sections'])
const sectionPath = sectionId => R.lensPath(['sections', sectionId])
const sectionWinnerPath = sectionId => R.lensPath(['sections', sectionId, 'winner'])
const squaresPath = sectionId => R.lensPath(['sections', sectionId, 'squares'])

export const getSections = state => R.view(sectionsPath, state)
const getSection = (state, sectionId) => R.view(sectionPath(sectionId), state)
const getSectionWinner = (state, sectionId) => R.view(sectionWinnerPath(sectionId), state)
export const getSquares = (state, sectionId) => R.view(squaresPath(sectionId), state)

const changeToPlay = (state, value) => R.changeObject('toPlay', R.always(value), state)
const changeSection = (state, sectionId, func) => R.changeObject('sections', R.replaceAtId(sectionId, func), state)
const changeWinner = (state, sectionId, func) => changeSection(state, sectionId, R.changeObject('winner', func))
const changeSquares = (state, sectionId, func) => changeSection(state, sectionId, R.changeObject('squares', func))
const changeButton = (state, sectionId, buttonId, value) => changeSquares(state, sectionId, R.replaceAtId(buttonId, R.always(value)))

const gameReducer = createReducer(
    initialState,
    {
        [play]: (state, action) => changeButton(state, action.payload.sectionId, action.payload.buttonId, action.payload.player),
        [checkSectionWinner]: (state, action) => {
            const winner = checkWinner(getSquares(state, action.payload.sectionId))
            return changeWinner(state, action.payload.sectionId, R.always(winner))
        },
        [switchPlayer]: state => R.changeObject('isTurnX', (val) => !val, state),
        [calculateAvailableMoves]: (state, action) => changeToPlay(state, getSectionWinner(state, action.payload.buttonId) ? 9 : action.payload.buttonId),
    }
)


export default gameReducer

const checkWinner = (squares) => {
    let winner = calculateWinner(squares)
    if (!winner) winner = countFinishedFields(squares) === 9 ? 0 : null;
    return winner
}