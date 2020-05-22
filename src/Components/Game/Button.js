import React from 'react'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { calculateBorders } from './utils'

function BoardButton(props) {
    const R = require('ramda')
    const val = calculateBorders(props.index)
    return (
        <Button
            variant="btn-outline-secondary"
            style={{ background: '#eae4d8', border: 'none' }}
            className={`cell btn-md ${val} border-warning`}
            onClick={props.onClick}
            disabled={(!props.active || props.value)}
        >
            {R.defaultTo('\xa0\xa0\xa0', props.value)}
        </Button>
    )
}

BoardButton.propTypes = {
    value: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default BoardButton;