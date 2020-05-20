import React from 'react'
import { calculateBorders } from './utils'

export default function SectionPanel(props) {
    const border = calculateBorders(props.sectionId)
    return (
        <div className="cell">
            <div className={` background-primary grid-container ${border} border-warning border-5 p-1 w-100 h-100 text-center rounded-0`}>
                <div style={{ fontSize: '4rem', width: '100%' }}>
                    {props.winner}
                </div>
            </div>
        </div>
    )
}
