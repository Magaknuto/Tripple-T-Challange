const R = require('ramda')
R.mapIndexed = R.addIndex(R.map);
R.changeObject = R.curry((key, func, obj) => ({ ...obj, [key]: func(R.view(R.lensProp(key), obj)) }))
export default R;


export const replaceAtId = R.curry((targetIndex, newValue, list) => R.mapIndexed((item, idx) => (targetIndex === idx) ? newValue(item) : item, list));

export const playMove = (board, sectionId, buttonId, player) => {
    let new_squares = replaceAtId(buttonId, R.always(player), board.sections[sectionId].squares)
    let new_section = { winner: checkWinner(new_squares), squares: new_squares }
    let new_sections = replaceAtId(sectionId, R.always(new_section), board.sections)
    let to_check = (buttonId === sectionId) ? new_section : board.sections[buttonId]
    let new_sectionToPlay = to_check.winner !== null ? 9 : buttonId
    return {
        sectionToPlay: new_sectionToPlay,
        sections: new_sections,
    }
}

export const checkGameWinner = (sections) => {
    checkWinner(sections.map(section => section.winner));
}

export const checkWinner = (squares) => {
    let winner = calculateWinner(squares)
    if (!winner) { winner = countFinishedFields(squares) === 9 ? 0 : null; }
    return winner
}


export const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export const countFinishedFields = (squares) => {
    return squares.reduce((acc, item) => (item !== null) ? acc + 1 : acc, 0);
}
