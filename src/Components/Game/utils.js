export const calculateBorders = (idx) => {
    const borders = [
        'border-right border-bottom',
        'border-right border-bottom border-left',
        'border-left border-bottom',
        'border-right border-bottom border-top',
        'border',
        'border-left border-bottom border-top',
        'border-right border-top',
        'border-right border-top border-left',
        'border-left border-top',
    ]
    return borders[idx];
}