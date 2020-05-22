import { playMove, checkWinner } from '../utils'


class Play {
    constructor(sectionId, buttonId) {
        this.sectionId = sectionId
        this.buttonId = buttonId
    }

    hash = () => this.sectionId.toString() + "," + this.buttonId.toString()
}

export class State {

    constructor(playHistory, board, player) {
        this.playHistory = playHistory
        this.board = board
        this.player = player
    }

    isPlayer = (player) => (player === this.player)
    hash = () => JSON.stringify(this.playHistory)
}


/** Class representing the game board. */
class Game {
    legalPlays(state) {
        let board = state.board;
        let plays = []
        if (board.sectionToPlay === 9) {
            plays = board.sections.reduce((acc, section, idx) => section.winner ? acc : [...acc, ...constructMoves(idx, getAvailableSquareIndexes(section))], [])
        }
        else {
            plays = constructMoves(board.sectionToPlay, getAvailableSquareIndexes(board.sections[board.sectionToPlay]));
        }
        return plays
    }
    /** Advance the given state and return it. */
    nextState(state, move) {
        if (!move) console.log(state.playHistory, move)
        let new_board = playMove(state.board, move.sectionId, move.buttonId, state.player)
        let new_player = state.player === 1 ? 2 : 1;
        let new_history = state.playHistory.slice()
        new_history.push(move.sectionId + " " + move.buttonId)

        return new State(new_history, new_board, new_player)
    }

    /** Return the winner of the game. */
    winner = state => checkWinner(state.board.sections.map(section => section.winner));

}

export default Game

const getAvailableSquareIndexes = section => section.squares.reduce((acc, square, idx) => square ? acc : [...acc, idx], []);
const constructMoves = (sectionId, squares) => squares.map(square => new Play(sectionId, square));
