import { createAction } from '@reduxjs/toolkit'

const makeMove = createAction('Game/MAKE_MOVE', (sectionId, buttonId, player, caller) => {
    return {
        payload: {
            sectionId,
            buttonId,
            player,
            caller,
        }
    }
})

export default makeMove;

