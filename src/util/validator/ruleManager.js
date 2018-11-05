import rules from './rules';

const allRules = rules;
const ruleManager = {
    getRuleByCustomRule(rule) {
        console.log('rulemananger: ', allRules);
        const ruleKey = Object.keys(rule).find(key => {
            return Object.keys(allRules).indexOf(key) > -1 || /validator/ig.test(key);
        });

        if (ruleKey) {
            if (/validator/ig.test(ruleKey)) {
                if (typeof rule[ruleKey] == 'function') {
                    return {
                        rule: {
                            validate: rule[ruleKey]
                        },
                        ruleType: ruleKey
                    }
                }
                return null;
            }
            return {
                rule: allRules[ruleKey],
                ruleType: ruleKey
            }
        }
        
        return null;
    },
    getParams(ruleParam, definedRule) {
        let params = (ruleParam + '').split(',');
        if (definedRule.paramNames) {
            return definedRule.paramNames.reduce((acc, paramName, index) => {
                acc[paramName] = params[index];
                return acc;
            }, {});
        }
    }
};

export default ruleManager;