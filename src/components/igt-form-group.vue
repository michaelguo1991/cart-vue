<template>
    <div class="igt-form-group">
        <div class="igt-form-group__legend" v-if="legend">{{ legend }}</div>
        <div class="igt-form-group__content">
            <slot>
                <igt-form-item
                    v-for="(field, index) in fields"
                    :key="index"
                    v-bind="field"
                ></igt-form-item>
            </slot>
        </div>
    </div>
</template>

<script>
    import IgtFormItem from './igt-form-item';

    export default {
        name: 'IgtFormGroup',
        components: {
            IgtFormItem
        },
        props: {
            legend: {
                type: String,
                default: ''
            },
            fields: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        beforeCreate() {
            this.form = this.$parent;
        }
    }
</script>