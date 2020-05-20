import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Section from '../../Components/Game/Section'
import SectionPanel from '../../Components/Game/SectionPanel'

import './css/grid.css'
import './css/gameArea.css'

function Game(props) {
    const section = props.sections.map(
        (section, idx) => (section.winner) ? <SectionPanel winner={section.winner} sectionId={idx} key={idx} /> : <Section sectionId={idx} key={idx} />
    )
    return (
        <div className='game-area'>
            <div className='grid-container p-2 bg-primary border-5 game-board' style={{ background: 'none' }}>
                <div className='big-grid'>
                    {section}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sections: state.game.sections,
})


export default connect(mapStateToProps)(Game)