import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import makeMove from '../../features/game/gameActions'
import Button from '../../Components/Game/Button'

import { calculateBorders } from '../../Components/Game/utils'

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: calculateBorders(this.props.sectionId),
        }
    }

    render() {
        const buttons = this.props.buttons.map((btn, idx) =>
            <Button
                onClick={() => this.props.makeMove(this.props.sectionId, idx, this.props.player, 'player')}
                value={btn}
                active={this.props.active}
                index={idx}
                key={idx}
            />
        )

        const bgColor = (this.props.active) ? 'bg-white' : 'bg-secondary';

        return (
            <div className="cell">
                <div className={` ${bgColor} grid-container ${this.state.border} border-warning border-5 p-1 w-100 h-100 text-center rounded-0`}>
                    <div className="grid">
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

Section.protoTypes = {
    buttons: PropTypes.array.isRequired,
    active: PropTypes.number.isRequired,
    player: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    buttons: state.game.board.sections[ownProps.sectionId].squares,
    active: state.game.board.sectionToPlay === 9 || state.game.board.sectionToPlay === ownProps.sectionId,
    player: state.game.isTurnX ? 'X' : "O",
})

const mapDispatchToProps = { makeMove }


export default connect(mapStateToProps, mapDispatchToProps)(Section)