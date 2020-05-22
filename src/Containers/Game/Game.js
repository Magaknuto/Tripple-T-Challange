import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './css/grid.css'
import './css/gameArea.css'

import Board from './Board'

function Game(props) {
    return (
        <div className='game-area'>
            <Board />
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     sections: state.game.sections,
// })


export default connect()(Game)