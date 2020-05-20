import { createAction } from '@reduxjs/toolkit'

const makeMove = (sectionId, buttonId, player) => {
    return [
        play(sectionId, buttonId, player),
        checkSectionWinner(sectionId),
        switchPlayer(),
        calculateAvailableMoves(buttonId)
    ]
};

export const play = createAction('Game/PLAY', (sectionId, buttonId, player) => {
    return {
        payload: {
            sectionId,
            buttonId,
            player
        }
    }
});

export const checkSectionWinner = createAction('Game/CHECK_SECTION_WINNER', sectionId => {
    return {
        payload: {
            sectionId
        }
    }
});

export const switchPlayer = createAction('Game/SWITCH_PLAYER');

export const calculateAvailableMoves = createAction('Game/CALCULATE_AVAILABLE_MOVES', buttonId => {
    return {
        payload: {
            buttonId
        }
    }
});

export default makeMove;

