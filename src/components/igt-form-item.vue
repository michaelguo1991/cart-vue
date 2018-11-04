<template>
    <div class="igt-form-item">
        <slot>
            <template v-if="!isBtnType">
                <component :is="componentName" v-model="modelValue" v-bind="props"></component>    
            </template>
            <cube-button v-bind="props" v-else>{{ props.label }}</cube-button>
        </slot>
    </div>
</template>

<script>
import { getComponentName } from './formUtil';

export default {
    name: 'IgtFormItem',
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
            type: Object,
            default() {
                return {}
            }
        },
        modelKey: String
    },
    data() {
        const modelValue = this.form.model[this.modelKey];
        this.refineField();
        return {
            modelValue
        }
    },
    computed: {
        componentName() {
            return getComponentName(this.realType);
        },
        isBtnType() {
            return this.realType == 'button';
        }
    },
    beforeCreate() {
        this.form = this.$parent.form || this.$parent;
    },
    created() {
    },
    methods: {
        refineField() {
            if (this.type == 'submit' || this.type == 'reset') {
                this.props.type = this.type;
                this.realType = 'button';
            } else {
                this.realType = this.type;
            }
        }
    }
}
</script>

