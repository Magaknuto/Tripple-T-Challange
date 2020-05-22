import { State } from './ttt'
import makeMove from '../gameActions'
import Game from './ttt'

const MonteCarlo = require('./monte-carlo.js')

let game = new Game()
let mcts = new MonteCarlo(game)


const AiPlay = (store) => {
    let game = store.getState().game
    console.log(JSON.stringify(game))
    let player = game.isTurnX ? 'X' : 'O'
    let state = new State([], game.board, player)
    mcts.runSearch(state, 1)
    let play = mcts.bestPlay(state)
    store.dispatch(makeMove(play.sectionId, play.buttonId, player, 'AI'))
}

export default AiPlay

// let state = game.start()
// let winner = game.winner(state)

// // From initial state, take turns to play game until someone wins
// while (winner === null) {
//     mcts.runSearch(state, 2)
//     let play = mcts.bestPlay(state)
//     state = game.nextState(state, play)
//     winner = game.winner(state)
// }

// console.log(winner)