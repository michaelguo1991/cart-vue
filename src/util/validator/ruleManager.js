import * as rules from './rules';

const allRulesMap = Object.keys(rules).reduce((prev, ruleName) => {
    prev[ruleName] = rules[ruleName];
    return prev;
}, {});

const ruleManager = {
    /**
     * 根据用户指定的校验规则，获取规则名称
     * @param {Object} userRule 用户指定的规则 `{required: true, msg: ''}`
     * @returns {string} 规则名称
     */
    getRuleName(userRule) {
        return Object.keys(userRule).find(key => {
            return allRulesMap[key] || /validator/ig.test(key);
        }) || '';
    },
    /**
     * 根据规则名称获取对应的规则验证函数及相关信息
     * @param {string} ruleName 规则名称
     * @param {Object} userRule 用户指定的规则，可为空 `{customValidator: validateFn, msg: ''}`
     * @returns {Object} 返回规则验证相关信息, 如无则返回null
     * ```
     * {
     *  validate: fn, //验证函数
     *  paramNames: [''] //规则参数
     * }
     * ```
     */
    getRuleValidator(ruleName, userRule) {
        if (!ruleName) {
            return null;
        }
        //自定义规则
        if (/validator/ig.test(ruleName)) {
            if (typeof userRule[ruleName] == 'function') {
                return {
                    validate: userRule[ruleName],
                    paramNames: []
                }
            } else {
                return null;
            }
        }
        return allRulesMap[ruleName] || null;
    }
};

export default ruleManager;