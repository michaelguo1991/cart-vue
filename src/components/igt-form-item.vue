<template>
    <div class="igt-form-item">
        <slot>
            <!-- <template v-if="!isBtnType">
                <component :is="componentName" v-model="modelValue" v-bind="props"></component>    
            </template>
            <cube-button v-bind="props" v-else>{{ props.label }}</cube-button> -->
        </slot>
    </div>
</template>

<script>
import { getComponentName } from './formUtil';
import validator from '../util/validator/validator';

export default {
    name: 'IgtFormItem',
    inject: ['igtForm'],
    props: {
        type: { //type和props用于根据schema自动生成
            type: String,
            default: 'input',
            validator(value) {
                //TODO: 用常亮表示
                const typeArray = ['checkbox', 'checkbox-group', 'input', 'switch', 'submit', 'reset'];
                return typeArray.indexOf(value) !== -1;
            }
        },
        props: {
            type: Object,
            default() {
                return {}
            }
        },
        rules: {
            type: [Object, Array]
        },
        modelKey: String
    },
    data() {
        return {
        }
    },
    computed: {
        componentName() {
            return getComponentName(this.realType);
        },
        isBtnType() {
            return this.realType == 'button';
        },
        realRules() {
            const formRules = (this.igtForm.rules || {})[this.modelKey] || [];
            const selfRules = this.rules;
            
            return [].concat(selfRules || formRules || []);
        },
        modelValue() {
            return this.igtForm.model[this.modelKey];
        }
    },
    beforeCreate() {
        // this.form = this.$parent.form || this.$parent;
        // console.log(this.igtForm);
    },
    created() {
        this.igtForm.fields.push(this);
        console.log('rules: ', this.realRules);
        this.initValue = this.modelValue;
    },
    methods: {
        refineField() {
            if (this.type == 'submit' || this.type == 'reset') {
                this.props.type = this.type;
                this.realType = 'button';
            } else {
                this.realType = this.type;
            }
        },
        validate() {
            return validator.validate(this.modelValue, this.realRules).then(val => {
                return {
                    valid: val.valid,
                    field: this,
                    errMsg: val.msg
                }
            });
        }
    }
}
</script>

