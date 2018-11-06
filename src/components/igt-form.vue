<template>
    <form class="igt-form">
        <slot>
            <igt-form-group 
                v-for="(group, index) in groups"
                :key="index"
                :legend="group.legend"
                :fields="group.fields"
            ></igt-form-group>
        </slot>
    </form>
</template>

<script>
    import IgtFormGroup from './igt-form-group';

    export default {
        name: 'IgtForm',
        components: {
            IgtFormGroup
        },
        provide() {
            return {
                igtForm: this
            }
        },
        props: {
            model: {
                type: Object,
                default() {
                    return {};
                }
            },
            schema: {
                type: Object,
                default() {
                    return {};
                }
            },
            options: {
                type: Object,
                default: {
                    immediateValidate: false,
                    scrollToInvalidField: false,
                    layout: 'standard'
                }
            },
            rules: [Array, Object]
        },
        data() {
            return {
                fields: []
            }
        },
        computed: {
            groups() {
                const schema = this.schema;
                let groups = schema.groups || [];
                if (schema.fields) {
                    groups.push({ fields: schema.fields });
                }
                return groups;
            }
        },
        methods: {
            /**
             * 验证表单中的所有元素是否满足既定规则
             * @returns {Promise}
             * 支持异步和同步返回，根据验证的rules来定   
             * resolve的数据结构
             * ```
             * {
             *  valid: true/false,
             *  errors: [{
             *      field: this,
             *      msg: '',
             *      ruleName: '',
             *      extraData: {}
             *  }
             * }]
             * ```
             */
            validate() {
                const promises = this.fields.reduce((acc, field) => {
                    acc.push(field.validate());
                    return acc;
                }, []);
                return Promise.all(promises).then(results => {
                    const invalidInfo = results.find(validResult => {
                        return !validResult.valid;
                    })
                    const errors = results.reduce((acc, result) => {
                        if (!result.valid) {
                            acc.push(result.error);
                        }
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
                        errors: []
                    }
                });
            }
        },
        beforeCreate() {
            
        },
        created() {
          console.log(this.model);
        }
    }
</script>
