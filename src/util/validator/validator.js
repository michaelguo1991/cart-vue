import ruleManager from './ruleManager';
import {isObject} from '../util';

const validator = {
    /**
     * 验证用户指定的所有规则；按照用户指定的规则顺序验证，如果遇到验证不通过规则，则立刻返回结果，不再验证其他剩余规则
     * @param {*} val 待验证的值
     * @param {Array} rules 用户指定的所有规则 `[{required: true, msg: ''}, {min: 6, msg: ''}]`
     * @returns {Promise}
     * 返回Promise   
     * 如果有验证不通过或全部通过验证, 则返回立即resolve的Promise  
     * 否则返回异步resolve的Promise 
     *  ```
     * {
     *  valida: true/false,
     *  errors: [{
     *      msg: '',
     *      ruleName: '',
     *      extraData: {}
     *  }]
     * }
     * ```
     */
    validate(val, rules) {
        let promises = [];
        let errors = [];

        let hasError = rules.some(rule => {
            const result = validator._validateRule(val, rule);
            if (result.then) {
                promises.push(result);
            } else if (!result.valid) {
                errors.push(result.error);
                return true;
            }
        });

        if (hasError) {
            return Promise.resolve({
                valid: false,
                errors
            });
        } else if (promises.length > 0) {
            return Promise.all(promises).then(results => {
                errors = results.reduce((acc, result) => {
                    !result.valid && acc.push(result.error);
                    return acc;
                }, []);

                if (errors.length > 0) {
                    return {
                        valid: false,
                        errors
                    }
                }
                
                return {
                    valid: true,
                    errors
                }
            })
        } else {
            return Promise.resolve({ valid: true, msg: '' })
        }
    },
    /**
     * 验证某条单一的规则
     * 
     * @param {*} val - 待验证的值
     * @param {Object} rule - 用户定义的规则 ``` {min: 6, msg: '不能少于6个字符'} ```
     * @returns {Promise|Object}
     * 返回Promise/Object:   
     * 如果待验证规则对应的validate方法返回正常的验证结果，则返回Object    
     * 如果validate返回的是promise, 则返回promise, 异步resolve   
     * Promise resolve&Object的数据结构：
     * ```
     * {
     *     valid: true/false, //标识验证是否通过
     *     error: {
     *         msg: '', //错误信息
     *         ruleName: '' //验证失败的规则名称
     *     }
     * }
     * ```
     * @example validator.validateRule('input', {required: true, msg: '请输入姓名'})
     */
    _validateRule(val, rule) {
        const ruleName = ruleManager.getRuleName(rule);
        const ruleValidator = ruleManager.getRuleValidator(ruleName, rule);

        //如果规则无效，则该规则置为验证通过
        if (!ruleName || !ruleValidator) {
            return { valid: true }
        }

        const ruleParamObj = this._getRuleParams(rule[ruleName], ruleValidator);
        const validResult = ruleValidator.validate(val, ruleParamObj);

        if (validResult.then) {
            return validResult.then(valid => {
                if (isObject(valid)) {
                    return {
                        valid: valid.valid,
                        error: {
                            msg: (valid.data && valid.data.msg) || rule.msg || '',
                            ruleName,
                            extraData: valid.data || null
                        }
                    }
                }
                return {
                    valid: valid,
                    error: {
                        msg: rule.msg,
                        ruleName
                    }
                }
            })
        }

        if (isObject(validResult)) {
            return {
                valid: validResult.valid,
                error: {
                    msg: (validResult.data && validResult.data.msg) || rule.msg || '',
                    ruleName,
                    extraData: validResult.data || null
                }
            }
        }

        return {
            valid: validResult,
            error: {
                msg: rule.msg,
                ruleName
            }
        }
    },
    /**
     * 转换用户指定的规则参数值为参数对象
     * @param {string} ruleParamValue 用户指定的规则的参数值，如 {between: '1,2', msg: ''}中的'1,2'
     * @param {Array} ruleValidator 规则验证对象
     * @returns {Object} 参数对象，如 {min: 1, max: 2}
     */
    _getRuleParams(ruleParamValue, ruleValidator) {
        let params = (ruleParamValue + '').split(',');
        if (Array.isArray(ruleValidator.paramNames)) {
            return ruleValidator.paramNames.reduce((acc, paramName, index) => {
                acc[paramName] = params[index];
                return acc;
            }, {});
        }
        return {};
    }
};

export default validator;