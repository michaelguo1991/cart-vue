const validate = (val, { minVal }) => {
    return Number(val) >= minVal;
}

export default {
    validate,
    paramNames: ['minVal']
}