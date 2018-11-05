const validate = (val, { minVal, maxVal }) => {
    return Number(val) >= minVal && Number(val) <= maxVal;
}

export default {
    validate,
    paramNames: ['minVal', 'maxVal']
}