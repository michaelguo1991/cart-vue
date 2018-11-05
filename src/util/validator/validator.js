import ruleManager from './ruleManager';

const validator = {};

validator.validate = (val, rules) => {
    let promises = [];
    let errorInfo;

    let hasError = rules.some(rule => {
        const result = validator.validateRule(val, rule);
        if (result.then) {
            promises.push(result);
        } else if (!result.valid) {
            errorInfo = result;
            return true;
        }
    });

    if (hasError) {
        return Promise.resolve(errorInfo);
    } else if (promises.length > 0) {
        return Promise.all(promises).then(results => {
            const invalidInfo = results.find(result => {
                return !result.valid;
            })
            if (invalidInfo) {
                return invalidInfo;
            } else {
                return { valid: true, msg: '' };
            }
        })
    } else {
        return Promise.resolve({ valid: true, msg: '' })
    }
}

validator.validateRule = (val, rule) => {
    const definedRule = ruleManager.getRuleByCustomRule(rule);
    const paramObj = ruleManager.getParams(rule[definedRule.ruleType], definedRule.rule);

    const validResult = definedRule.rule.validate(val, paramObj);
    if (validResult.then) {
        return validResult.then(valid => {
            return {
                valid: valid,
                msg: rule.msg
            }
        })
    } else {
        return {
            valid: validResult,
            msg: rule.msg
        }
    }
}

export default validator;