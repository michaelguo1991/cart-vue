<template>
    <div class="igt-validator" :class="validatorClass">
        <div class="igt-validator__content">
            <slot></slot>
        </div>
        <div class="igt-validator__msg">
            <slot name="message">
                <p class="igt-validator__default-msg" v-show="msg">{{ msg }}</p>
            </slot>
        </div>
    </div>
</template>

<script>
    const messages = {
        required: {
            string: '请输入字符',
            number: '请输入数字',
            date: '请输入日期',
            email: '请输入邮箱',
            tel: '请输入手机号码'
        },
        type: {
            string: '请输入有效字符',
            number: '请输入有效数字',
            date: '请输入有效日期',
            email: '请输入有效邮箱',
            tel: '请输入有效的手机号码'
        },
        min: {
            string: '至少输入{{ config }}位字符',
            number: '不得小于{{ config }}',
            date: '请输入{{ config }}之后的日期',
            email: '至少输入{{ config }}位字符',
            tel: '至少输入{{ config }}位字符'
        },
        max: {
            string: '请勿超过{{ config }}位字符',
            number: '不得大于{{ config }}',
            date: '请输入{{ config }}之前的日期',
            email: '请勿超过{{ config }}位字符',
            tel: '请勿超过{{ config }}位字符'
        },
        len: {
            string: '请输入{{ config }}位字符',
            number: '长度应等于{{ config }}',
            email: '请输入{{ config }}位字符',
            tel: '请输入{{ config }}位字符'
        }
    };

    export default {
        name: 'IgtValidator',
        props: {
            model: {
                required: true
            },
            rules: {
                type: Object,
                required: true,
                default() {
                    return {}
                }
            },
            messages: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                msg: '',
                invalid: false
            }
        },
        computed: {
            valueType() {
                return this.rules.type || 'string';
            },
            validatorClass() {
                return {
                    'igt-validator--invalid': this.invalid
                }
            }
        },
        watch: {
            model() {
                this.validate();
            }
        },

        created() {

        },

        methods: {
            validate() {
                const ruleType = Object.keys(this.rules).find((ruleType) => {
                    return !this._validate(ruleType, this.rules[ruleType]);
                })
                if (ruleType) {
                    this.invalid = true;
                    this.msg = messages[ruleType][this.valueType];
                } else {
                    this.invalid = false;
                    this.msg = '';
                }
            },
            _validate(ruleType, ruleValue) {
                switch(ruleType) {
                    case 'required':
                        return !!this.model;
                    case 'type':
                        switch(ruleValue) {
                            case 'email':
                                return /ctrip.com$/.test(this.model);
                            case 'number':
                                return /^\d+$/.test(this.model);
                            case 'string':
                                return typeof this.model == 'string';
                            default:
                                return true;
                        }
                    case 'min':
                        switch(this.valueType) {
                            case 'string':
                            case 'email':
                            case 'tel':
                                return this.model.length >= ruleValue;
                            case 'number':
                                return this.model > ruleValue;
                        }
                    case 'max':
                        case 'string':
                        case 'email':
                        case 'tel':
                            return this.model.length <= ruleValue;
                        case 'number':
                            return this.model < ruleValue;
                    case 'len':
                        case 'string':
                        case 'email':
                        case 'tel':
                        case 'number':
                            return this.model.length == ruleValue;
                    default: 
                        return true;
                }
                
                if (typeof ruleValue == 'function') {
                    const fn = ruleValue;
                    
                }
            }
        }
    }
</script>

<style>
    .igt-validator--invalid input {
        color: red;
    }
</style>
