const R = require('ramda')
R.mapIndexed = R.addIndex(R.map);
R.changeObject = R.curry((key, func, obj) => ({ ...obj, [key]: func(R.view(R.lensProp(key), obj)) }))
R.replaceAtId = R.curry((targetIndex, newValue, list) => R.mapIndexed((item, idx) => (targetIndex === idx) ? newValue(item) : item, list));

export default R;


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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export const countFinishedFields = (squares) => {
    return squares.reduce((acc, item) => (item) ? acc + 1 : acc, 0);
}
