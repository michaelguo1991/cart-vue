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
            validate() {
                const promises = this.fields.reduce((acc, field) => {
                    acc.push(field.validate());
                    return acc;
                }, []);
                return Promise.all(promises).then(results => {
                    const invalidInfo = results.find(result => {
                        return !result.valid;
                    })
                    return invalidInfo || {valid: true};
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
