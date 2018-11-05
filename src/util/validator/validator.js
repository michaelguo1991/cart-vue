const validator = {};

validator.validate = (val, rules) => {
    console.log('validator validate');
    return Promise.resolve(true);
}

export default validator;